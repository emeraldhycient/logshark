export interface registerParams{
    name: string,
    email: string,
    password:string
}


export interface SignUpFormValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
}

export interface MutationError {
    response?: {
        data?: {
            message: string;
        };
    };
}