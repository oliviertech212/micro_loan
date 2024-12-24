// import prisma from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export default async function handler(req, res) {
//   const { method } = req;
//   const { email, password } = req.body;

//   if (method === "POST") {
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as any, {
//       expiresIn: "1d",
//     });

//     res.status(200).json({ token, user });
//   }
// }

import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        {
          message:
            "Invalid credentials or if you dont have account contact admin ",
        },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );
    return NextResponse.json({ token, user });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await prisma.user.findUnique({
      where: { id: (decoded as any).id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("User not found:", error);
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}

export async function PUT(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name: email.split("@")[0] },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    // localStorage.setItem("token", token);

    return NextResponse.json({ token, user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}
