import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum IncidentSeverity {
	LOW = 'LOW',
	MEDIUM = 'MEDIUM',
	HIGH = 'HIGH',
}

@Entity('incidents')
export class Incident {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 512 })
	title: string;

	@Column({ type: 'text', nullable: true })
	description?: string;

	@Column({
		type: 'enum',
		enum: IncidentSeverity,
		default: IncidentSeverity.LOW,
	})
	severity: IncidentSeverity;

	@CreateDateColumn({ type: 'timestamptz' })
	reported_at: Date;
}
