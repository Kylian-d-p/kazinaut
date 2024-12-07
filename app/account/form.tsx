"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { schemas } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import editAccountAction from "./action";

export default function EditAccountForm(props: { defaultValues?: { email?: string | null; name?: string | null } }) {
  const { toast } = useToast();
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<z.infer<typeof schemas.editAccount>>({
    resolver: zodResolver(schemas.editAccount),
    defaultValues: {
      email: props.defaultValues?.email || "",
      name: props.defaultValues?.name || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schemas.editAccount>) => {
    const res = await editAccountAction(values);

    if (res) {
      if (res.error) {
        toast({ title: "Erreur", description: res.error, variant: "destructive" });
      }

      if (res.success) {
        setSuccess(res.success);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled placeholder="Email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom Complet</FormLabel>
              <FormControl>
                <Input placeholder="Nom Complet" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {success && <p className="text-success">{success}</p>}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Modifier
        </Button>
      </form>
    </Form>
  );
}
