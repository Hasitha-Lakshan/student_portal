import { environment } from "src/environments/environment";

const BASE_URL = environment.apiEndpointUrl;

export const apiEndpoint = {
    studentRegister: `${BASE_URL}/authservice/studentregister`,
    studentLogin: `${BASE_URL}/authservice/studentlogin`
};