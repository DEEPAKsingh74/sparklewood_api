import { Request, Response, Router } from "express";
import incidentRoute from "./incident.routes";

const router_v1 = Router();

/** Brach Routes. */

router_v1.get("/health", (_req: Request, res: Response) => {
	res.status(200).json({ "status": "OK", "message": "AI Safety Log API is running" })
})

router_v1.use("/incidents", incidentRoute);


export default router_v1;