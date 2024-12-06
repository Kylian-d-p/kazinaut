import { z } from "zod";

export const types = {
  email: z.string().email(),
  password: z.string().min(6, "Le mot de passe doit être d'au moins 3 caractères").max(25, "Le mot de passe doit être de 25 caractères maximum"),
};
