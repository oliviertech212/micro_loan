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
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  telephone: z.string().min(10, "Telephone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

import { users } from "@/dummydata/data";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const FormSchema = z.object({
    telephone: z
      .string()
      .min(10, {
        message: "Telephone number must be at least 10 digits.",
      })
      .refine((value) => !/\s/.test(value), {
        message: "Telephone number should not contain spaces.",
      }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      telephone: "",
      password: "",
    },
  });


  // {
  //   id: 1,
  //   fname: "John",
  //   lname: "Doe",
  //   phone: "1234567890",
  //   password: "password123",
  //   loans: [],
  //   createdAt: new Date().toISOString(),
  //   updatedAt: new Date().toISOString(),
  //   role: "Admin",
  // },

  // phone: "0734567891",
  // password: "password123",
  
  const handleLogin = async (data: LoginFormValues) => {
    setLoading(true);
  

   let user = users.filter(user => user.phone === data.telephone && user.password === data.password);

   
   
   if  (user[0]){
    console.log("user role", user[0].role);
    
    toast.success(" Login successfully");
       if (user[0].role=="Admin"){
        router.push("/dashboard");
        if (typeof window !== "undefined") {
          let userrole = localStorage.getItem("Admin");}

       } else{
        router.push("/myaccount");
       }

    

   } else {
    toast.error("need to register please ");
   }




    // try {
    //   const res = await axios.post("/api/auth", data);
    //   if (typeof window !== "undefined") {
    //     localStorage.setItem("usertoken", res.data.token);
    //     localStorage.setItem(
    //       "stockuser",
    //       JSON.stringify({
    //         telephone: res.data.user.telephone,
    //         name: res.data.user.name,
    //         role: "admin",
    //       })
    //     );
    //   }
    //   router.push("/dashboard");
    // } catch (err: any) {
    //   if (err.status === 401) {
    //     toast.error(err.response.data.message);
    //   }
    //   console.log("error on login", err);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(handleLogin)}
        className="space-y-4 w-full max-w-md p-6 shadow-2xl rounded-lg bg-primary"
      >
        <h1 className="text-xl font-semibold text-center">Login</h1>

        <Label>Phone</Label>
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

<Label>PassWord</Label>
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
          {loading ? "Logging in..." : "Login"}
        </Button>


        <p className=" w-[100%]   ">Dont have Account? <Link className="hover:text-blue-500 underline"
      href="/register"
      >Register</Link> </p>


      </form>

    
    </Form>

    
  );
}


