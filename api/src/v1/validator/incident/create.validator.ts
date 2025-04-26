import { z } from 'zod';

export const createIncidentSchema = z.object({
  title: z.string().max(512, "Title must be less than or equal to 512 characters").nonempty("Title is required"),
  description: z.string().optional(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional().default('LOW'),
});
