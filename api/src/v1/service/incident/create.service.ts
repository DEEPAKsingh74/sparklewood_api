import { AppDataSource } from 'v1/core/data_source/app_data_source';
import { CreateIncidentDto } from 'v1/core/dto/incident/create.incident';
import { IncidentResponseDto } from 'v1/core/dto/incident/response.incident';
import { Incident } from 'v1/core/entity/incident.entity';
import { IncidentMapper } from 'v1/core/mapper/incident/incident.mapper';

export async function createIncident(incidentdto: CreateIncidentDto): Promise<IncidentResponseDto> {
	try {

		const repo = AppDataSource.getRepository(Incident);

		const incidentEntity = IncidentMapper.fromCreateDto(incidentdto);
		const newIncident = await repo.save(incidentEntity);

		return IncidentMapper.toResponseDto(newIncident);

	} catch (error) {
		throw error;
	}
}