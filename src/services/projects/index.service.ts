import axiosClient from "@/provider/axios";
import { ICreateProject, IPagination } from "@/types";

const projectServices = {
    getAllProjects: async ({ currentPage, limit, search }: IPagination) => {
        const response = await axiosClient.get('/projects', {
            params: {
                currentPage,
                limit,
                search
            }
        });
        return response.data;
    },
    getProjectById: async (id: string) => {
        const response = await axiosClient.get(`/projects/${id}`);
        return response.data;
    },
    createProject: async (data: ICreateProject) => {
        const response = await axiosClient.post('/projects', data);
        return response.data;
    },
    updateProject: async (id: string, data: ICreateProject) => {
        const response = await axiosClient.put(`/projects/${id}`, data);
        return response.data;
    },
    deleteProject: async (id: string) => {
        const response = await axiosClient.delete(`/projects/${id}`);
        return response.data;
    }
}

export default projectServices;