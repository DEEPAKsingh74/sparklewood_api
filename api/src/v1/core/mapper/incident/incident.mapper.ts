import { CreateIncidentDto } from "v1/core/dto/incident/create.incident";
import { IncidentResponseDto } from "v1/core/dto/incident/response.incident";
import { Incident, IncidentSeverity } from "v1/core/entity/incident.entity";

export class IncidentMapper {
	static toResponseDto(incident: Incident): IncidentResponseDto {
		return {
			id: incident.id,
			title: incident.title,
			description: incident.description,
			severity: incident.severity,
			reported_at: incident.reported_at,
		};
	}

	static fromCreateDto(dto: CreateIncidentDto): Partial<Incident> {
		return {
			title: dto.title,
			description: dto.description,
			severity: dto.severity ?? IncidentSeverity.LOW,
		};
	}
}
