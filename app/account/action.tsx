"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { schemas } from "@/types";
import { z } from "zod";

export default async function editAccountAction(values: z.infer<typeof schemas.editAccount>) {
  const checkedValues = await schemas.editAccount.safeParseAsync(values);

  if (!checkedValues.success) {
    return { error: "Les données envoyées ne sont pas valides" };
  }

  const session = await auth();

  if (!session || !session.user) {
    return { error: "Vous devez être connecté pour modifier votre compte" };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: checkedValues.data.name,
    },
  });

  return {success: "Votre compte a été modifié avec succès"};
}
