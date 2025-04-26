import { dbConfig } from "@config/db.config";
import { DataSource } from "typeorm";
import { Incident } from "../entity/incident.entity";

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: dbConfig.host,
	port: dbConfig.port,
	username: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.database,
	synchronize: true,
	entities: [Incident],
});
