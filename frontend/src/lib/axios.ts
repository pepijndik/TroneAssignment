import Axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL



const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        "Content-Type":"application/json",
		"Accept": "application/json"
    },
    withCredentials: true,
    withXSRFToken: true,
  
})

export const csrf = () => axios.get(baseURL + '/sanctum/csrf-cookie')

export default axios