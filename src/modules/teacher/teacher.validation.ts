import { z } from "zod";

export const createTeacherSchema =
  z.object({
    body: z.object({
      name: z.string(),

      email: z.string().email(),

      phone: z.string(),

      password: z.string().min(6),

      qualification:
        z.string().optional(),

      experience:
        z.number().optional(),

      bio:
        z.string().optional(),
    }),
  });