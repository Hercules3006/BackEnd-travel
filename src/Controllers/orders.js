import orderService from '../Services/orders.js';
import clientService from '../Services/clients.js';
import destinationService from '../Services/destinations.js';
import ResponseObj from '../ResponseObj/index.js';
import Valid from "../Utils/valid.js";
import Constants from '../Utils/constants.js';

const orderController = {
    getAllOrders: async () => {
        return ResponseObj(200, Constants.success, await orderService.getAllOrders());
    },

    getOrderById: async (id) => {
        if(Valid.Empty(id)) return ResponseObj(400, "Invalid id", null);
        let rs = await orderService.getOrderById(id);
        if(rs === null || rs.length === 0) {
            return ResponseObj(404, Constants.order_not_found, rs);
        }
        return ResponseObj(200, Constants.success, rs);
    },

    getOrderByClientId: async (id) => {
        if(Valid.Empty(id)) return ResponseObj(400, "Invalid id", null);
        let rs = await orderService.getOrderByClientId(id);
        return ResponseObj(200, Constants.success, rs);
    },

    createOrder: async (order) => {
        if(Valid.Empty(order.idDestination) || Valid.Empty(order.idClient) || Valid.Empty(order.startDate) || Valid.Empty(order.endDate) || Valid.Empty(order.quantity)) {
            return ResponseObj(400, "Dữ liệu không được để trống!", null);
        }   

        let stT = new Date(order.startDate).getTime();
        let enT = new Date(order.endDate).getTime();
      
        if(stT >= enT) return ResponseObj(400, "Thời gian bắt đầu không được lớn hơn thời gian kết thúc!", null);
        if(stT < new Date().getTime() - 10*60*100) return ResponseObj(400, "Thời gian bắt đầu không được ở trong quá khứ!", null);

        if(order.quantity < 1) return ResponseObj(400, "Số lượng người không hợp lệ!", null);

        let client = await clientService.getClientById(order.idClient);
        if(client === null) return ResponseObj(404, "Không tìm thấy người dùng", null);
        let destination = await destinationService.getDestinationById(order.idDestination);
        if(destination === null) return ResponseObj(404, "Không tìm thấy địa điểm", null);

        try{
            await orderService.createOrder(order);
            return ResponseObj(200, Constants.success, order);
        }
        catch(err) {
            return ResponseObj(500, "Server error", null);
        }
    },

    updateOrder: async (id, order) => {
        if(Valid.Empty(order.idDestination) || Valid.Empty(order.idClient) || Valid.Empty(order.startDate) || Valid.Empty(order.endDate) || Valid.Empty(order.quantity)) {
            return ResponseObj(400, "Dữ liệu không được để trống!", null);
        }   

        let stT = new Date(order.startDate).getTime();
        let enT = new Date(order.endDate).getTime();
      
        if(stT >= enT) return ResponseObj(400, "Thời gian bắt đầu không được lớn hơn thời gian kết thúc!", null);
        if(stT < new Date().getTime() - 10*60*100) return ResponseObj(400, "Thời gian bắt đầu không được ở trong quá khứ!", null);

        if(order.quantity < 1) return ResponseObj(400, "Số lượng người không hợp lệ!", null);

        let client = await clientService.getClientById(order.idClient);
        if(client === null) return ResponseObj(404, "Không tìm thấy người dùng", null);
        let destination = await destinationService.getDestinationById(order.idDestination);
        if(destination === null) return ResponseObj(404, "Không tìm thấy địa điểm", null);
        
        return ResponseObj(200, Constants.success, await orderService.updateOrder(id, order));
    },

    deleteOrder: async (id) => {
        return ResponseObj(200, Constants.success, await orderService.deleteOrder(id));
    },

    cancelOrder: async (body) => {
        if(Valid.Empty(body.id)) return ResponseObj(400, "Invalid id", null);
        let rs = await orderService.getOrderById(body.id);
        if(rs === null) return ResponseObj(404, Constants.order_not_found, rs);
        return ResponseObj(200, Constants.success, await orderService.cancelOrder(body.id));
    }
}

export default orderController;