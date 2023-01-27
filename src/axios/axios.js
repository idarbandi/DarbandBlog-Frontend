import axiosInstance from "./login";

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        // test for token presence, no point in sending a request if token isn't present
        if (
            localStorage.getItem("refresh_token") &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized"
        ) {
            const refresh_token = localStorage.getItem("refresh_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("access_token");
            return axiosInstance
                .post("/token/refresh/", { refresh: refresh_token })
                .then((response) => {
                    localStorage.setItem("access_token", response.data.access);
                    localStorage.setItem("refresh_token", response.data.refresh);

                    axiosInstance.defaults.headers["Authorization"] =
                        "Bearer " + response.data.access;
                    originalRequest.headers["Authorization"] =
                        "Bearer " + response.data.access;

                    return axiosInstance(originalRequest);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // specific error handling done elsewhere
        return Promise.reject({ ...error });
    }
);


export default axiosInstance;