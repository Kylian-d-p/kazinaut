import { z } from "zod";

export const types = {
  email: z.string().email(),
};

export const schemas = {
  signin: z.object({
    email: types.email,
  }),
  editAccount: z.object({
    name: z.string().min(3),
  })
};
