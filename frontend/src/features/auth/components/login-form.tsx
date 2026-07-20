"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginSchema, LoginSchema } from "../schemas/login.schema";
import { useLogin } from "../hooks/use-login";
import { useAuthStore } from "../store/auth.store";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const login = useAuthStore((state) => state.login);

  const mutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginSchema) {
    try {
      const response = await mutation.mutateAsync(values);

      login(response.data.token, response.data.user);

      toast.success(response.message);

      router.replace("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Unable to sign in."
      );
    }
  }

  return (
    <Card className="rounded-3xl border-slate-200 shadow-xl">
      <CardContent className="p-8">

        {/* Header */}

        <div className="mb-8 space-y-2 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">

            <span className="text-xl font-bold">
              T
            </span>

          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back
          </h1>

          <p className="text-sm text-slate-500">
            Sign in to continue to your workspace.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Email */}

          <div className="space-y-2">

            <Label>Email Address</Label>

            <Input
              {...register("email")}
              type="email"
              placeholder="name@example.com"
              className="h-11 rounded-xl"
            />

            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* Password */}

          <div className="space-y-2">

            <div className="flex items-center justify-between">

              <Label>Password</Label>

              <button
                type="button"
                className="text-sm text-slate-500 hover:text-slate-900"
              >
                Forgot password?
              </button>

            </div>

            <div className="relative">

              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="h-11 rounded-xl pr-10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                rounded-md
                p-1
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-slate-700
                "
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* Remember */}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Checkbox id="remember" />

              <Label
                htmlFor="remember"
                className="text-sm font-normal"
              >
                Remember me
              </Label>

            </div>

          </div>

          {/* Button */}

          <Button
            className="h-11 w-full rounded-xl"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <p className="text-center text-xs leading-5 text-slate-500">
            Only authorized employees can access
            <span className="font-semibold text-slate-700">
              {" "}TASKORA
            </span>.
          </p>

        </form>

      </CardContent>
    </Card>
  );
}