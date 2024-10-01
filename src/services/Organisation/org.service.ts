import axiosClient from "@/provider/axios";

const organisationService = {
    createOrganization({ name }: { name: string }) {
        return axiosClient.post('/organizations', {name})
    },
    getUserOrganizations() {
        return axiosClient.get('/organizations')
    }
}


export default organisationService