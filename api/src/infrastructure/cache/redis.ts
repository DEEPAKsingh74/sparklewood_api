import { envConfig } from '@config/env.config';
import logger from '@utils/logger/Logger';
import { createClient, RedisClientType } from 'redis';

class RedisService {
	private static instance: RedisService;
	private client: RedisClientType;
	private isConnected = false;

	private constructor() {
		this.client = createClient({
			url: envConfig.redis_url
		});

		this.client.on('error', (err) => {
			logger.error('Redis Client Error: ' + err);
			this.isConnected = false;
		});
	}

	public static getInstance(): RedisService {
		if (!RedisService.instance) {
			RedisService.instance = new RedisService();
		}
		return RedisService.instance;
	}

	public async connect(): Promise<void> {
		if (!this.isConnected) {
			await this.client.connect();
			this.isConnected = true;
			logger.info('Connected to Redis');
		}
	}

	public async set(
		key: string,
		value: any,
		options?: { ttl?: number }
	): Promise<void> {
		const serializedValue = JSON.stringify(value);
		if (options?.ttl) {
			await this.client.setEx(key, options.ttl, serializedValue);
		} else {
			await this.client.set(key, serializedValue);
		}
	}

	public async get<T>(key: string): Promise<T | null> {
		const value = await this.client.get(key);
		return value ? JSON.parse(value) : null;
	}

	public async del(key: string): Promise<void> {
		await this.client.del(key);
	}

	public async flushAll(): Promise<void> {
		await this.client.flushAll();
	}

	public async disconnect(): Promise<void> {
		await this.client.disconnect();
		this.isConnected = false;
	}
}

const redisService = RedisService.getInstance();
export default redisService;