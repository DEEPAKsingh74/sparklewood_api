import { AppDataSource } from 'v1/core/data_source/app_data_source';
import { IncidentResponseDto } from 'v1/core/dto/incident/response.incident';
import { Incident } from 'v1/core/entity/incident.entity';
import { IncidentMapper } from 'v1/core/mapper/incident/incident.mapper';

export async function getAllIncidents(
	page = 1,
	limit = 10,
	ordered = false,
): Promise<IncidentResponseDto[]> {
	try {
		const repo = AppDataSource.getRepository(Incident);

		const findOptions: any = {
			skip: (page - 1) * limit,
			take: limit,
		};

		if (ordered) {
			findOptions.order = {
				reported_at: 'DESC',
			};
		}

		const [incidents] = await repo.findAndCount(findOptions);

		return incidents.map(IncidentMapper.toResponseDto);
	} catch (error) {
		throw error;
	}
}
