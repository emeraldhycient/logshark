import axios from "axios"

export const locationService = {
    getLocationDataByIp: async (ipv4: string) => {
        const res = await axios.get(`http://www.geoplugin.net/json.gp?ip=${ipv4}`)
        return res.data
    }
}