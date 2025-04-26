import { SuccessResponse } from "@utils/success_handler/SuccessHandler";
import { Request, Response, Router } from "express";
import { createIncidentController } from "v1/controller/incident/create.controller";
import { deleteIncidentController } from "v1/controller/incident/delete.controller";
import { getIncidentsController } from "v1/controller/incident/get.controller";
import { getSingleIncidentController } from "v1/controller/incident/getSingle.controller";
import cacheMiddleware from "v1/middleware/cache.middleware";
import { validateWithZod } from "v1/middleware/validateWithZod";
import { createIncidentSchema } from "v1/validator/incident/create.validator";

const incidentRoute = Router()

/**GET - /health  => Get the health of incident route */
incidentRoute.get("/health", (_req: Request, res: Response) => {
	res.status(200).json(new SuccessResponse({ statusCode: 200, message: "Incident route." }))
})

/**GET - /  => Get all the incidents. Also apply pagination and limits */
incidentRoute.get("/", cacheMiddleware(60), getIncidentsController);

/**GET - /:id  => Get particular incident. */
incidentRoute.get("/:id", cacheMiddleware(60), getSingleIncidentController);

/**POST - /  => Post an incident. */
incidentRoute.post(
	"/",
	validateWithZod(createIncidentSchema),
	createIncidentController
);

/**DELETE - /:id   => Delete the incident with the id specified*/
incidentRoute.delete("/:id", deleteIncidentController)



export default incidentRoute;