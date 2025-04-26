import { NotFoundError } from '@utils/error_handler/ErrorStatus';
import { AppDataSource } from 'v1/core/data_source/app_data_source';
import { IncidentResponseDto } from 'v1/core/dto/incident/response.incident';
import { Incident } from 'v1/core/entity/incident.entity';
import { IncidentMapper } from 'v1/core/mapper/incident/incident.mapper';

export async function getIncident(
	incident_id: number
): Promise<IncidentResponseDto> {
	try {
		const repo = AppDataSource.getRepository(Incident);

		const incident = await repo.findOne({
			where: { id: incident_id }
		})

		if (!incident) {
			throw new NotFoundError("incident not found");
		}

		return IncidentMapper.toResponseDto(incident);
	} catch (error) {
		throw error;
	}
}
