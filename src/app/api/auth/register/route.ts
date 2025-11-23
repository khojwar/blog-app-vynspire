import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const users: any[] = [];

export async function POST(request: NextRequest) {
    try {   
        const { username, email, password } = await request.json();

        console.log("email", email);
        

        if (!username || !email || !password) {
            return NextResponse.json({ message: "All fields are required." }, { status: 400 });
        }

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return NextResponse.json({ message: "User already exists." }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = { id: Date.now(), username, email, password: hashedPassword };
        users.push(newUser);

        return NextResponse.json({ message: "User registered successfully.", userId: newUser.id }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error." }, { status: 500 });
    }
}