const appConfig: configType = {
    baseUrl: import.meta.env.VITE_BASE_URL,

    // ls - Local storage
    lsAccessToken: import.meta.env.VITE_TOKEN_NAME as string,
    lsUser: import.meta.env.VITE_LOCAL_STORAGE_USER as string,
};

export { appConfig };

interface configType {
    baseUrl: string;
    lsAccessToken: string;
    lsUser: string;
}
