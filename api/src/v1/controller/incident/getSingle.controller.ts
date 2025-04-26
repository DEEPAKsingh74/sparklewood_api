import { BadRequestError } from "@utils/error_handler/ErrorStatus";
import { SuccessResponse } from "@utils/success_handler/SuccessHandler";
import { NextFunction, Request, Response } from "express";
import { IncidentResponseDto } from "v1/core/dto/incident/response.incident";
import { getIncident } from "v1/service/incident/get.service";

export async function getSingleIncidentController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {

		const incident_id = parseInt(req.params.id as string);

		if (isNaN(incident_id) || !incident_id) throw new BadRequestError("invalid incident id");

		const incident: IncidentResponseDto = await getIncident(incident_id);

		res.status(200).json(
			new SuccessResponse({
				statusCode: 200,
				message: "Incident retrieved successfully",
				data: incident,
			})
		);
	} catch (error) {
		next(error);
	}
}
