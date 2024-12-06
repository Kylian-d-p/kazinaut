import { z } from "zod";

export const types = {
  email: z.string().email(),
  password: z.string().min(6, "Le mot de passe doit être d'au moins 3 caractères").max(25, "Le mot de passe doit être de 25 caractères maximum"),
};

export const schemas = {
  signin: z.object({
    email: types.email,
    password: types.password,
  }),
  signup: z
    .object({
      email: types.email,
      password: types.password,
      passwordc: z.string(),
      firstName: z.string().min(1),
      lastName: z.string().min(1),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.passwordc) {
        ctx.addIssue({ code: "custom", message: "Les mots de passes ne correspondent pas", path: ["passwordc"] });
      }
      return data;
    }),
  forgotPassword: z.object({
    email: types.email,
  }),
  resetPassword: z.object({
    token: z.string(),
    password: types.password,
    passwordc: z.string(),
  }),
};
