import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export interface RouteParams {
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    callback: (RouteCallbackData) => Promise<Record>,
    bodySchema?: z.ZodObject,
    returnData?: boolean
    successMessage: string,
}

export interface RouteCallbackParams {
    body?: Record;
    params?: Record;
    query?: Record;
    token?: JwtPayload
}

export interface SuccessResponse {
    success: string;
    data?: Record;
}

export interface ErrorResponse {
    error: string | Record;
}

export interface Mail {
    to: string;
    subject: string;
    html?: string;
    text?: string;
}

