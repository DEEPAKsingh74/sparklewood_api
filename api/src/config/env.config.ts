import { getEnvValue } from "./config";

interface Config {
	port: number;
	redis_url: string;
	redis_port: number;
}


export const envConfig: Config = {
	port: parseInt(getEnvValue('PORT', '8000'), 10),
	redis_port: parseInt(getEnvValue('REDIS_PORT', '6379'), 10),
	redis_url: getEnvValue('REDIS_URL', 'redis://localhost:6379'),
};
