import axios from "axios";

export const api = axios.create({
    baseURL:'http://localhost:3000/',
    headers:{
        'content-type': 'application/json'
    }

})

export const apiUser = axios.create({
    baseURL:'http://localhost:3001/',
    headers:{
        'Content-Type':'application/json'
    }
})