import axiosClient from "@/provider/axios";

export const pricingPlanService = {
    getAll: async () => {
        const res = await axiosClient.get("/pricing-plans")
        return res.data;
    }

    


}