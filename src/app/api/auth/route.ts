import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, password, name } = await request.json();

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });

        return NextResponse.json({ message: "Account created successfully", user: { ...user, password: undefined } });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: "Internal Server Error", error: "An unknown error occurred" }, { status: 500 });
    }
}
