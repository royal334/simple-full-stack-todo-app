import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL

export async function apiFetch( method:string, endpoint:string, data?:any){

     const token = localStorage.getItem('token')

     const response = await axios({
          method,
          url:`${url}${endpoint}`,
          data,
          headers:{
               "Content-Type": "application/json",
               ...(token && { Authorization: `Bearer ${token}` })
          }
     })

     if(!response){
          console.log("creation failed")
     }

     return response.data
}