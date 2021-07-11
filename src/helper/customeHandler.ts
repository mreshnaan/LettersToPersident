import { Response } from "express";

export function responseHandler(res: Response, status: string, statusCode: number, data: JSON, message: string) {

    return res.status(201).send({
        status: status,
        statusCode: statusCode,
        data: data,
        message: message

    })

}
export function errorResponseHandler(res: Response, status: string, statusCode: number, data: JSON, errorMessage: string) {

    return res.status(400).send({
        status: status,
        statusCode: statusCode,
        data: data,
        message: errorMessage,
    })

}