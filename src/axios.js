import axios from 'axios';


const baseURL = 'http://127.0.0.1:8000/api/';


const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem("access_token")
            ? "JWT " + localStorage.getItem("access_token")
            : null,
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if (typeof error.response === "undefined") {
            alert(
                "oops !!! something went Wrong , there" +
                "might be a CORS Issue , We Will be On The Way " +
                "Very Shortly"
            );
            return Promise.reject.error;
        }

        if (
            error.response.status === 401 &&
            originalRequest.url === baseURL + 'token/refresh/'
        ) {
            window.location.href = `/login/`;
            return Promise.reject(error);
        }

        if (
            error.response.status === 401 && 
            originalRequest.url === baseURL + 'token/refresh/'
        ) {
            window.location.href = "/login/";
            return Promise.reject(error);
        }

        if (
            error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'
        ) {
            const refrehtoken = localStorage.getItem("refresh_token");

            if (refrehtoken) {
                const TokenParts = JSON.parse(atob(refrehtoken.split('.')[1]));

                // exp data in token is expressed in seconds but now returns milliseconds
                const now = Math.ceil(Date.now / 1000);
                console.log(TokenParts.exp);

                if (TokenParts.exp > now) {
                    return axiosInstance
                        .post('/token/refresh/', { refresh: refrehtoken })
                        .then((response) => {
                            localStorage.setItem("access_token", response.data.access);
                            localStorage.setItem("refresh_token", response.data.refresh);

                            axiosInstance.defaults.headers["Authorization"] =
                                "JWT " + response.data.access;
                            originalRequest.headers["Authorization"] =
                                "JWT " + response.data.access;

                            return axiosInstance(originalRequest);
                        })
                        .catch((err) => {
                            alert(err)
                        });
                } else {
                    console.log("refresh token is Expired", TokenParts.exp, now);
                    window.location.href = '/login/';
                }
            } else {
                console.log("Refresh token not available");
                window.location.href = '/login/';
            }
        }

        // handling Errors
        return Promise.reject(error);
    }
);

    export default axiosInstance;