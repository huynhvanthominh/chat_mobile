export interface PayloadResponse<T> {
    data: T;
    message: string;
    status: number;
    success: boolean;
}