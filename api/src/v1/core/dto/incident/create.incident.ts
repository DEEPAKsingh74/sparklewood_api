import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { IncidentSeverity } from 'v1/core/entity/incident.entity';

export class CreateIncidentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(512)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(IncidentSeverity)
  @IsOptional()
  severity?: IncidentSeverity;
}
