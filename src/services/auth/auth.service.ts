import axiosClient from "@/provider/axios";
import { Endpoints } from "@/constants/endpoints";
import { registerParams } from "@/types";


const authservice = {
   async register({name,email,password}:registerParams) {
        return await axiosClient.post(Endpoints.auth,{name,email,password})
    }
}


export default authservice