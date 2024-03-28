import axios from "axios";

//construindo a base da api.
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;


