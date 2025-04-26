import redisService from "@infra/cache/redis";
import { BadRequestError, NotFoundError } from "@utils/error_handler/ErrorStatus";
import { SuccessResponse } from "@utils/success_handler/SuccessHandler";
import { NextFunction, Request, Response } from "express";
import { deleteIncident } from "v1/service/incident/delete.service";
import { getIncident } from "v1/service/incident/get.service";

export async function deleteIncidentController(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {

		const incident_id = parseInt(req.params.id as string);

		/**Check if the specified incident id is present or not. */
		if (isNaN(incident_id) || !incident_id) throw new BadRequestError("invalid id");

		const incident = await getIncident(incident_id);

		if (!incident) throw new NotFoundError("incident not found");

		await deleteIncident(incident_id);

		/**Invalidate the cache for this key of incident */
		const key = `cache:${req.originalUrl}`;
		
		await redisService.del(key);

		res.status(200).json(
			new SuccessResponse({
				statusCode: 200,
				message: "Incident deleted successfully",
			})
		);
	} catch (error) {
		next(error);
	}
}
