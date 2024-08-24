export type GlobalResponse<T> = {
    status: string;
    error: Error | null;
    data: T
}

type Error = {
    errorMessage: string;
    errorCode: number;
}