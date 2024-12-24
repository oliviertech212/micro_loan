"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TextInputField from "@/components/text-select-inputs/textinputs";
import SelectField from "@/components/text-select-inputs/selectinputs";
import { LaonType } from "@/types/types";


import axios from "axios";

// export type LaonType = {
//   id: number;
//   name: string;
//   loanamount: number;
//   monthlyinocme: number;
//   status: LoanStatus;
//   userId: number;
//   owner: UserType;
//   createdAt: string;
//   updatedAt: string;
 
// };



const formSchema = z.object({

});

type FormValues = z.infer<typeof formSchema>;

const LaonForm = ({
 
}: {
 
}) => {

  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:  {},
  });
  const token =
    typeof window !== "undefined" && localStorage.getItem("usertoken");
  const onSubmit = async (data: FormValues) => {
   
      
  };

  const OnUpdate = async (data: FormValues) => {
    
  };


  return (
   
      <div className="p-6 bg-gray-100 rounded-lg">
      

        <Form {...form}>
          <form
            onSubmit={
            onSubmit
            }
            className=" space-y-4 md:space-y-0 md:space-x-5 grid md:grid-cols-3"
          >
            <TextInputField
              name="name"
              label=" name"
              placeholder="Ex: olivier"
              control={form.control}
            />
             <TextInputField
              name="amount"
              label=" amount"
              placeholder="Ex: 10000"
              control={form.control}
            />
           
           

            <div className="mt-15 py-5">
              {loading ? (
                <Button
                  variant="secondary"
                  type="submit"
                  className="bg-primary hover:bg-primary text-white"
                >
                  <span> ......</span>
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  type="submit"
                  className="bg-primary hover:bg-primary text-white w-full md:w-1/3"
                >
                  { "Add "}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    )
  
};

export default LaonForm;
