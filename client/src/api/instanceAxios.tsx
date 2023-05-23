import axios from "axios";

axios.defaults.withCredentials = true;

export const request = axios.create({
    baseURL: 'http://localhost:8080/admin/api',
});

export const authRequest = axios.create({
    baseURL: 'http://localhost:8080/auth',
})

export const get  = async (path = '', optional = {}) => {
    const response = await request.get(path,optional);
    return response.data;
};

export default request;