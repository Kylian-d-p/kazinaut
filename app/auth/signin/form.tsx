"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { schemas } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import signinAction from "./action";

export default function SigninForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schemas.signin>>({
    resolver: zodResolver(schemas.signin),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schemas.signin>) => {
    const res = await signinAction(values);

    if (res?.error) {
      toast({ title: "Erreur", description: res.error, variant: "destructive" });
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
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>Se connecter</Button>
      </form>
    </Form>
  );
}
