"use server";

import { signIn } from "@/auth";
import { schemas } from "@/types";
import { z } from "zod";

export default async function signinAction(values: z.infer<typeof schemas.signin>) {
  const checkedValues = await schemas.signin.safeParseAsync(values);

  if (!checkedValues.success) {
    return { error: "Les données envoyées ne sont pas valides." };
  }

  await signIn("nodemailer", {
    email: checkedValues.data.email,
  });
}
