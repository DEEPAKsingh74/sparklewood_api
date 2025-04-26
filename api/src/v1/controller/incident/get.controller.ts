import { SuccessResponse } from "@utils/success_handler/SuccessHandler";
import { NextFunction, Request, Response } from "express";
import { IncidentResponseDto } from "v1/core/dto/incident/response.incident";
import { getAllIncidents } from "v1/service/incident/getAll.service";

export async function getIncidentsController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let page = parseInt(req.query.page as string);
		let limit = parseInt(req.query.limit as string);
		const ordered = req.query.ordered === 'true';

		// Validate and fallback to defaults
		if (isNaN(page) || page < 1) page = 1;
		if (isNaN(limit) || limit < 1) limit = 10;

		const incidents: IncidentResponseDto[] = await getAllIncidents(page, limit, ordered);

		res.status(200).json(
			new SuccessResponse({
				statusCode: 200,
				message: "Incidents retrieved successfully",
				data: incidents,
			})
		);
	} catch (error) {
		next(error);
	}
}
