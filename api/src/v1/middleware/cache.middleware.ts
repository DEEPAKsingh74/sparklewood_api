import redisService from "@infra/cache/redis";
import { NextFunction, Request, Response } from "express";

const cacheMiddleware = (ttl: number = 60) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		if (req.method !== 'GET') {
			return next();
		}

		const key = `cache:${req.originalUrl}`;

		try {
			const cachedData = await redisService.get<any>(key);
			if (cachedData) {
				console.log('Serving from cache');
				res.json(cachedData);
				return;
			}

			// Store original json method
			const originalJson = res.json.bind(res);

			// Override res.json to cache the response
			res.json = (body: any) => {
				redisService.set(key, body, { ttl })
					.catch(err => console.error('Cache set error:', err));
				return originalJson(body);
			};

			return next();
		} catch (err) {
			console.error('Cache middleware error:', err);
			return next();
		}
	};
};

export default cacheMiddleware;