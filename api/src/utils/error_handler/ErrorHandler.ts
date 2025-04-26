import { NextFunction, Request, Response } from "express";
import { ErrorBase } from "../error_handler/ErrorBase";
import logger from "../logger/Logger";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);

    if (err instanceof ErrorBase) {
        res.status(err.statusCode).json({
            success: false,
            error: {
                message: err.message,
                detail: err.details || null,
                status: err.statusCode
            }
        });
        return;
    }
    res.status(500).json({
        success: false,
        error: {
            message: "Internal Server Error",
            detail: "Something went wrong! Please retry",
            status: 500
        }
    });
    return;
}
