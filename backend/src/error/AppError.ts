export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    typeError: string;

    constructor(message: string, typeError: string, statusCode: number) {
        super(message);
        this.typeError = typeError;
        this.statusCode = statusCode;
        this.isOperational = true
    }

}