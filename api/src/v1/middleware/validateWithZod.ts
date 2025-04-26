import { BadRequestError } from '@utils/error_handler/ErrorStatus';
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function validateWithZod(schema: any) {
	return (req: Request, _res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessages: string[] = error.errors.map(
					e => `${e.path.join('.')}: ${e.message}`
				);
				throw new BadRequestError('validation failed', errorMessages);
			}
			next(error);
		}
	};
}
