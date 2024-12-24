"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const registerSchema = z.object({
  telephone: z.string().min(10, "Telephone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  lname: z.string().min(2, "name is required"),
  fname: z.string().min(2, "name is required"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      telephone: "",
      password: "",
    },
  });

  const handleRegister = async (data: RegisterFormValues) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/register", data);
      if (typeof window !== "undefined") {
        localStorage.setItem("usertoken", res.data.token);
        localStorage.setItem(
          "stockuser",
          JSON.stringify({
            telephone: res.data.user.telephone,
            name: res.data.user.name,
            role: "user",
          })
        );
      }
      router.push("/dashboard");
    } catch (err: any) {
      if (err.status === 401) {
        toast.error(err.response.data.message);
      }
      console.log("error on register", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(handleRegister)}
        className="space-y-4 w-full max-w-md p-6 shadow-2xl rounded-lg bg-primary"
      >
        <h1 className="text-xl font-semibold text-center">Register</h1>



        <FormField
          control={form.control}
          name="fname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="EX: olivier" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="lname"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="EX: olivier" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Telephone Field */}
        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Telephone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="secondary"
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
        <p className="">Have an account <Link
      href="/signin"
      >Login</Link> </p>
      </form>
    </Form>
  );
}