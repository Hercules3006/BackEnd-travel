import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tomato.travel.best@gmail.com',
        pass: 'lswv ygvz tfba irbv'
    }
});

const sendEmail = (mailOptions) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) { console.log(error); }
        else { console.log('Email sent: ' + info.response); }
    });
}

export const sendOTP = (email, title, otp) => {
    let mailOptions = {
        from: 'TomatoTravel',
        to: email,
        subject: title,
        html: `
            <div style="
                width: 40%;
                height: 100%;   
                display: grid;
                place-items: center;
                background-color: #f1f1f1;
                border-radius: 1rem;
                overflow: hidden;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: #383838;
                margin: 0 auto;
            ">  
                <div style="
                    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; 
                    font-style: italic; 
                    padding: 1rem; 
                    background-color: rgb(255, 115, 0);
                    font-size: 1.8rem; 
                    font-weight: 700; 
                    color: #fff;
                    width: 100%; 
                    text-align: center; 
                    box-sizing: border-box"
                > Travel </div>
                <p style="
                    font-size: 1.2rem; 
                    font-weight: 600; 
                    width: 100%; 
                    text-align: center; 
                    margin: 1rem 0;"> Hello there! Thank for join with us! </p>
                <p style="font-size: 1rem; font-weight: 600; width: 100%; text-align: center; margin: 0;"> Your OTP is: </p>
                <h1 style=" color: rgb(255, 115, 0);
                            font-size:2rem; 
                            width: fit-content; 
                            text-align:center; 
                            margin: 1rem auto;"> 
                        ${otp}
                </h1>
                <p style="font-size: 1rem; font-weight: 600; width: 100%; text-align: center;margin: 0 0 2rem 0;"> Don't share this OTP for anyone. </p>
            </div>
        `
    };

    sendEmail(mailOptions);
}

export const sendAlert = (email, title, order) => {
    let mailOptions = {
        from: 'TomatoTravel',
        to: email,
        subject: title,
        html: `
            <div style="padding: 1rem; box-sizing: border-box; margin: 0 auto; box-shadow: 0 0 0.5rem rgb(0,0,0,0.4); width: 80%; background-color: #f5f5f5">
                <div style="font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-style: italic; padding: 2rem;font-size: 2rem; font-weight: 800;background-color: #ff7300; color: #ffffff;width: 100%; box-sizing: border-box; margin: 0 0 1rem 0;  text-align: center; "> Travel </div>
                <div style="width: 100%; height: 25rem;"> <img style="width: 100%; height: 100%; object-fit: cover;" src="${order.idDestination.images[0]}"/> </div>
                <h1 style="color:#333333"> Xin chào ${order.idClient.userName}! </h1>
                <h3 style="color:#333333"> Bạn có một lịch trình đi đến ${order.idDestination.name} vào lúc ${new Date(order.startDate).toLocaleString()}</h3>
                <h3 style="color:#333333"> Đừng bỏ lỡ chuyến đi nhé! </h3>
            </div>
        `
    };
    sendEmail(mailOptions);
}
