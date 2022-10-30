export interface StudentRegisterRequest {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface StudentRegisterResponse {
    status: boolean;
    error: string;
}

export interface StudentLoginRequest {
    username: string;
    password: string;
}

export interface StudentData {
    firstName: string;
    lastName: string;
    userName: string;
}

export interface StudentLoginResponse {
    authenticationtoken: string;
    studentData: StudentData;
    status: boolean;
}