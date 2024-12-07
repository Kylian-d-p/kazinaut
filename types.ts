import { z } from "zod";

export const types = {
  email: z.string().email(),
};

export const schemas = {
  signin: z.object({
    email: types.email,
  }),
  editAccount: z.object({
    email: types.email,
    name: z.string().min(3),
  }),
};
