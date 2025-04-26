export class ErrorBase extends Error {

	statusCode: number;
	details?: string[];

	constructor(message: string, statusCode: number, details?: string[]) {
		super(message);
		this.statusCode = statusCode;
		this.details = details;
		Error.captureStackTrace(this, this.constructor);
	}
}