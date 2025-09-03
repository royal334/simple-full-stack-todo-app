import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL

export async function apiFetch( method:string, endpoint:string, data?:any){

     const response = await axios({
          method,
          url:`${url}${endpoint}`,
          data,
          headers:{
               "Content-Type": "application/json"
          }
     })

     if(!response){
          console.log("creation failed")
     }

     return response.data
}