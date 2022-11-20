import axios from "axios";

const REACT_APP_BE = 'http://localhost:3000/';      //'http://localhost:3000/api/v1/users/login'


export const FetchData = async (endpoint, { method, body, ...customConfig } = {}) => {
    const token = sessionStorage.getItem("authToken");
    const headers = { "Content-Type": "application/json" };

    if (token) {
        headers.authorization = `Bearer ${token}`;
    }

    const config = {
        method,
        url: `${REACT_APP_BE}api/v1${endpoint}`,
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };

    if (body) {
        config.data = JSON.stringify(body);
    }

    //console.log(config);
    return axios(config).then((e) => {
        const { data } = e;
        //console.log(data, e);

        return data;
    });

}

