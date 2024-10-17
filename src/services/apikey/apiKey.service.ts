import axiosClient from "@/provider/axios";
import { ICreateApiKey } from "@/types";

export const apiKeyService = {
    getApiKey: async () => {
        const res = await axiosClient.get("/apikeys")
        return res.data
    },

    CreateApiKey: async ({ name, expiresAt, permissions, projectId, ipRestrictions }: ICreateApiKey) => {
        const res = await axiosClient.post("/apikeys", { name, expiresAt, permissions, projectId, ipRestrictions })
        return res.data
    }

}