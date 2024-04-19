const Valid = {
    Empty: (value) => {
        if(value == "") return true;
        if(value == null) return true;
        if(value == undefined) return true;
        return false;
    },
    Email: (value) => {
        const reg = /\S+@\S+\.\S+/;
        return reg.test(value);
    },
}

export default Valid;