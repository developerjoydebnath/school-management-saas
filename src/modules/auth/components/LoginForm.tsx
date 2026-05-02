"use client";

import { LOGIN_FORM_FIELDS } from "@/modules/auth/constants/auth.constant";
import { LoginFormValues, loginSchema } from "@/modules/auth/dto/auth.dto";
import InputField from "@/shared/components/form/InputField";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { PATHS } from "@/shared/configs/paths.config";
import axios from "@/shared/lib/axios";
import { useAuthStore } from "@/shared/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


const setAuthCookie = (token: string) => {
  document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Lax`;
};

const DEMO_EMAILS = [
  "dev@educore.com",
  "superadmin@educore.com",
  "admin@educore.com",
  "teacher@educore.com",
  "student@educore.com",
  "parent@educore.com",
];

export default function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleDemoClick = (email: string) => {
    form.setValue("email", email);
    form.setValue("password", "password");
    form.clearErrors();
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {

      // Use axios mapped to the mock JSON server proxy
      // We pass query params to json-server to find a matching user
      const response = await axios.get("/users", {
        params: {
          email: data.email,
          password: data.password,
        },
      });

      const users = response.data;

      if (users && users.length > 0) {
        const user = users[0];

        // Save the matched user to Zustand auth store
        setAuth({
          id: user.id,
          name: user.name,
          auth_id: user.id.toString(),
          image: null,
          base_role: user.base_role,
          status: "active",
          permissions: user.permissions,
          token: user.token,
        });

        // Set token in cookies for the Edge proxy to read
        setAuthCookie(user.token);

        toast.success(`Login Successful`);
        // Redirect to the dashboard inside (protected)
        router.push(PATHS.DASHBOARD);
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (err: any) {
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-accent p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Sign in to EduCore Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {
              LOGIN_FORM_FIELDS.map((field) =>
                <InputField key={field.name} control={form.control} {...field} />
              )
            }

            <Button type="submit" className="w-full h-10 mt-4" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
            </Button>

            <div className="flex justify-end">
              <Link href={PATHS.AUTH.FORGOT_PASSWORD} className="text-sm text-primary hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start justify-center border-t p-4 bg-muted/20">
          <p className="text-xs font-semibold text-muted-foreground mb-3 w-full text-center">Demo Roles Available:</p>
          <div className="flex flex-wrap gap-2 justify-center text-[11px]">
            {DEMO_EMAILS.map((email) => (
              <span
                key={email}
                onClick={() => handleDemoClick(email)}
                className="bg-secondary px-2.5 py-1 rounded-md border font-medium cursor-pointer hover:bg-secondary/80 hover:border-primary/50 transition-colors"
              >
                {email}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground w-full text-center mt-3 text-xs">All passwords are: <strong className="text-foreground">password</strong></p>
        </CardFooter>
      </Card>
    </div>
  );
}