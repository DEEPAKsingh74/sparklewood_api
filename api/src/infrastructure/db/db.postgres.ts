import { dbConfig } from "@config/db.config";
import { Pool } from "pg";

class Database {
	private static instance: Database;
	private pool: Pool;

	private constructor() {
		this.pool = new Pool({
			user: dbConfig.user,
			host: dbConfig.host,
			database: dbConfig.database,
			password: dbConfig.password,
			port: dbConfig.port,
			max: 10, 
			idleTimeoutMillis: 30000,
			connectionTimeoutMillis: 5000,
		});
	}

	// Get the Singleton instance
	public static getInstance(): Database {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}

	// Connect to PostgreSQL
	public async connectDB() {
		try {
			await this.pool.connect();
			console.log("✅✅ PostgreSQL Connected Successfully.");
		} catch (error) {
			console.error("❌ PostgreSQL Connection Failed:", error);
			process.exit(1);
		}
	}

	// Get the pool instance for queries
	public getPool(): Pool {
		return this.pool;
	}

	// Cleanup function to close DB connection
	public async closeDB() {
		try {
			await this.pool.end();
			console.log("🔴 PostgreSQL Connection Closed.");
		} catch (error) {
			console.error("❌ Error while closing PostgreSQL connection:", error);
		}
	}
}

export default Database.getInstance();
