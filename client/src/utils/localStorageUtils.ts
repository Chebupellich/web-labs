const saveToLocalStorage = (key: string, value: string): void => {
    localStorage.setItem(key, value);
};

const getFromLocalStorage = (key: string): string | null => {
    return localStorage.getItem(key);
};

const removeFromLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
};

export { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage };
