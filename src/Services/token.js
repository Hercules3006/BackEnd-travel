const createExpiryTime = (ex) => {
    let date = Math.floor(Date.now() / 1000)
    return date + ex
}

const token = {
    createToken: (userId) => {
        const token = userId + "." + createExpiryTime(60*60*24*7)
        return token
    },
    
    checkTokenExpiry: (token) => {
        let date = Math.floor(Date.now() / 1000)
        let tokenDate = token.split(".")[1]
        if (date > tokenDate) return false
        return true
    },
    
    createOTP: () => {
        const otp = Math.floor(100000 + Math.random() * 900000) + "." + createExpiryTime(60 * 2)
        return otp
    },

    checkOTPExpiry: (otp) => {
        console.log(otp)
        let date = Math.floor(Date.now() / 1000)
        let otpDate = otp.split(".")[1]
        console.log(date, otpDate, date > Number(otpDate))
        if (date > Number(otpDate)) return false
        return true
    }
}

export default token;

