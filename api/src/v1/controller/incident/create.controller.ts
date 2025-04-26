import { SuccessResponse } from "@utils/success_handler/SuccessHandler";
import { NextFunction, Request, Response } from "express";
import { CreateIncidentDto } from "v1/core/dto/incident/create.incident";
import { createIncident } from "v1/service/incident/create.service";

export async function createIncidentController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {

		const { title, description, severity } = req.body;

		const createIncidentDto = new CreateIncidentDto();
		createIncidentDto.title = title;
		createIncidentDto.description = description;
		createIncidentDto.severity = severity;

		const incident = await createIncident(createIncidentDto);

		res.status(201).json(
			new SuccessResponse({
				statusCode: 201,
				message: "Incident created successfully",
				data: incident,
			})
		);
	} catch (error) {
		next(error);
	}
}
