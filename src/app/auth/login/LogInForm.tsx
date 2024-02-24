"use client";
import Button from "@/component/UI/Button";
import Input from "@/component/UI/Input";
import { createSupabaseBrowserClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";
import { ZodError, z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please use a valid email"),
  password: z.string().min(6, "Password must be 6 charecter long"),
});

type CustomFromError = {
  email?: string[];
  password?: string[];
};

function LogInForm() {
  const [errors, setErrors] = useState<CustomFromError>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  type FormFildsT = {
    name: string;
    email: string;
    password: string;
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const valid = loginSchema.safeParse(userData);

    setErrors(undefined);
    if (!valid.success) {
      setErrors(valid.error.formErrors.fieldErrors);
      setLoading(false);
    }

    const { data, error } = await supabase.auth.signInWithPassword(userData);
    setLoading(false);
    console.log(data);

    if (error || !data) {
      toast.warning("Invalid email or password");
      return setLoading(false);
    }

    router.push("/");

    console.log(userData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-1">
      <Input
        name="email"
        label="Email*"
        placeHolder="e.g robin@gmail.com"
        error={errors?.email && errors.email[0]}
      />
      <Input
        name="password"
        label="Password*"
        placeHolder="password"
        error={errors?.password && errors.password[0]}
      />
      <Button type="submit" className="mt-2" loading={loading}>
        Login
      </Button>
    </form>
  );
}

export default LogInForm;
