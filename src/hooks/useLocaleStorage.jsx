
const useLocaleStorage = () => {
    const objStored = window.localStorage.getItem("userInfo");
    const userInfo = JSON.parse(objStored);
    return userInfo;
}

export default useLocaleStorage;