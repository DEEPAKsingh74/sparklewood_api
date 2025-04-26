import { getEnvValue } from "./config";

interface Config {
	user: string;
	host: string;
	database: string;
	password: string;
	port: number
}


export const dbConfig: Config = {
	user: getEnvValue("POSTGRES_USER"),
	host: getEnvValue("DB_HOST"),
	database: getEnvValue("POSTGRES_DB"),
	password: getEnvValue("POSTGRES_PASSWORD"),
	port: parseInt(getEnvValue('DB_PORT', '5432'), 10),
};
