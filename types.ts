import { z } from "zod";

export const types = {
  email: z
    .string({ required_error: "Veuillez entrer une adresse email valide", invalid_type_error: "Veuillez entrer une adresse email valide" })
    .email("Veuillez entrer une adresse email valide"),
  rouletteBet: z.object({
    numbers: z.array(z.object({ number: z.number().min(1).max(36), bet: z.number().min(1) })),
    red: z.number().min(1),
    black: z.number().min(1),
    even: z.number().min(1),
    odd: z.number().min(1),
    firstHalf: z.number().min(1),
    secondHalf: z.number().min(1),
    firstDozen: z.number().min(1),
    secondDozen: z.number().min(1),
    thirdDozen: z.number().min(1),
    firstColumn: z.number().min(1),
    secondColumn: z.number().min(1),
    thirdColumn: z.number().min(1),
    firstAndSecondDozen: z.number().min(1),
    secondAndThirdDozen: z.number().min(1),
    firstAndSecondColumn: z.number().min(1),
    secondAndThirdColumn: z.number().min(1),
    onHorseBack: z.array(
      z.object({ numbers: z.array(z.number().min(1).max(36)).length(2), bet: z.number().min(1) }).superRefine((val, ctx) => {
        // Les 2 nombres doivent être voisins sur la table (3x12)
        if (Math.abs(val.numbers[0] - val.numbers[1]) !== 1 && Math.abs(val.numbers[0] - val.numbers[1]) !== 3) {
          ctx.addIssue({ code: "custom", message: "Les nombres à cheval sont invalides" });
        }
      })
    ),
    sixains: z.array(z.object({ startingLine: z.number().min(0).max(10), bet: z.number().min(1) })),
    transversales: z.array(z.object({ line: z.number().min(0).max(11), bet: z.number().min(1) })),
    squares: z.array(
      z
        .object({
          numbers: z.array(z.number().min(1).max(36)).length(4),
          bet: z.number().min(1),
        })
        .superRefine((val, ctx) => {
          // Les 4 nombres doivent être voisins sur la table (3x12)
          if (
            Math.abs(val.numbers[0] - val.numbers[1]) !== 1 ||
            Math.abs(val.numbers[0] - val.numbers[2]) !== 3 ||
            Math.abs(val.numbers[0] - val.numbers[3]) !== 4
          ) {
            ctx.addIssue({ code: "custom", message: "Les nombres du carré sont invalides" });
          }
        })
    ),
  }),
};

export const schemas = {
  signin: z.object({
    email: types.email,
  }),
  editAccount: z.object({
    email: types.email,
    name: z
      .string({ required_error: "Veuillez entrer un nom valide", invalid_type_error: "Veuillez entrer un nom valide" })
      .min(1, "Le nom doit faire au minimum 1 caractère"),
  }),
};
