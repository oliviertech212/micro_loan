"use client";
import React, { useState, useEffect } from "react";


import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Page = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedproduct, setSelectedproduct] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);



  const topRef = React.useRef<HTMLDivElement>(null);

  const token =
    typeof window !== "undefined" && localStorage.getItem("usertoken");

  const getallsales = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/sales", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response", response);

   

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message || "Failed to fetch products");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("usertoken")) {
      getallsales();
    }
  }, []);

  return <div className="p-10"> "All Loan"</div>;
};

export default Page;

