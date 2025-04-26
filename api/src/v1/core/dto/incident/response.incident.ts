import { IncidentSeverity } from "v1/core/entity/incident.entity";

export class IncidentResponseDto {
  id: number;
  title: string;
  description?: string;
  severity: IncidentSeverity;
  reported_at: Date;
}
