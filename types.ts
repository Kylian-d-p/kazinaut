import { z } from "zod";

export const types = {
  email: z.string({required_error: "Veuillez entrer une adresse email valide", invalid_type_error: "Veuillez entrer une adresse email valide"}).email("Veuillez entrer une adresse email valide"),
};

export const schemas = {
  signin: z.object({
    email: types.email,
  }),
  editAccount: z.object({
    email: types.email,
    name: z.string({required_error: "Veuillez entrer un nom valide", invalid_type_error: "Veuillez entrer un nom valide"}).min(1, "Le nom doit faire au minimum 1 caractère"),
  }),
};
