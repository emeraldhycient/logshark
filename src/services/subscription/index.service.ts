import axiosClient from "@/provider/axios";
import { ISubscribeOrUpgrade } from "@/types";

export const subscriptionService ={

    subscribeOrUpgrade: async ({ planId, reference, eventCount, price, isAnnual }: ISubscribeOrUpgrade) => {
           const res = await axiosClient.post("/subscriptions/upgrade", {
            planId,
            reference,
            eventCount,
            price,
            isAnnual
           })
        return res.data;
    }
}