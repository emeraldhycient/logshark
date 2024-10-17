import { IGeoPluginResponse } from "@/types"
import axios from "axios"

export const locationService = {

    //TODO: ccorrect the return type when performing request
    getLocationDataByIp: async (ipv4: string): Promise<IGeoPluginResponse> => {
        const res = await axios.get(`http://www.geoplugin.net/json.gp?ip=${ipv4}`)
        console.log(res.data)
        return res.data
    }
}
