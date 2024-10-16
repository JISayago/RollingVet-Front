import axios from "axios";

const clienteAxios = axios.create({
    //baseURL:`${import.meta.env.VITE_URL_BACK_LOCAL}`
    baseURL: "https://rollingvet-back.onrender.com"
})

export default clienteAxios;