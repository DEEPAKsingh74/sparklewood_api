import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import http from "http";
import { errorHandler } from "@utils/error_handler/ErrorHandler";
import router_v1 from "v1/routes/index.routes";
import { AppDataSource } from "v1/core/data_source/app_data_source";
import redisService from "@infra/cache/redis";

dotenv.config();

const app = express();
const server = http.createServer(app);


app.use(cors({
	origin: 'http://localhost:3000',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true
}));

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize type orm
AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');
	})
	.catch((err) => {
		console.error('Error during Data Source initialization', err);
	});

// Initialize Redis connection
redisService.connect()
	.then(() => console.log('Redis connected'))
	.catch(err => console.error('Redis connection error:', err));


app.use("/api/v1", router_v1);

app.use(errorHandler);

export default server;