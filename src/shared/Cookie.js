const setCookie = (name, value, exp = 1) => {
    let date = new Date();
    date.setTime(date.getTime() + exp * 20 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
};



const deleteCookie = (name) => {
    let date = new Date("2022-01-01").toUTCString();
    document.cookie = name + "=; expires=" + date;
};

export { setCookie, deleteCookie };