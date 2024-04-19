import categoryService from '../Services/categories.js';
import ResponseObj from '../ResponseObj/index.js';
import Valid from "../Utils/valid.js";
import Constants from '../Utils/constants.js';
const categoryController = {
    getAllCategories: async () => {
        return ResponseObj(200, Constants.success, await categoryService.getAllCategories());
    },

    getCategoryById: async (id) => {
        let rs = await categoryService.getCategoryById(id);
        if(rs === null || rs.length === 0) {
            return ResponseObj(404, "Category not found", rs);
        }
        return ResponseObj(200, Constants.success, rs);
    },

    createCategory: async (category) => {
        if(Valid.Empty(category._id)||Valid.Empty(category.name)) {
            return ResponseObj(400, Constants.invalid_data, null);
        }
        let preCategory = await categoryService.getCategoryById(category._id);
        if (preCategory !== null && preCategory.length > 0) {
            return ResponseObj(400, "Category already exists", preCategory);
        }
        try{
            await categoryService.createCategory(category);
            return ResponseObj(200, Constants.success, category);
        }
        catch(err) {
            return ResponseObj(500, "Server error", null);
        }
    },

    updateCategory: async (id, category) => {
        if(Valid.Empty(category.name)) {
            return ResponseObj(400, Constants.invalid_data, null);
        }
        let preCategory = await categoryService.getCategoryById(id);
        if (preCategory === null || preCategory.length === 0) {
            return ResponseObj(404, "Category not found", preCategory);
        }
        return ResponseObj(200, Constants.success, await categoryService.updateCategory(id, category));
    },

    deleteCategory: async (id) => {
        return ResponseObj(200, Constants.success, await categoryService.deleteCategory(id));
    }
}

export default categoryController;