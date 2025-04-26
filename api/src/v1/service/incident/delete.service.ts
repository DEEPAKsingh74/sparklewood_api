import { AppDataSource } from 'v1/core/data_source/app_data_source';
import { Incident } from 'v1/core/entity/incident.entity';

export async function deleteIncident(incident_id: number): Promise<boolean> {
	try {
		const repo = AppDataSource.getRepository(Incident);

		const result = await repo.delete({ id: incident_id });

		return result.affected !== 0;

	} catch (error) {
		throw error;
	}
}
