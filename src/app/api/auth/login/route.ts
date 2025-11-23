import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users: any[] = [
    { id: 1, username: "testuser", email: "testuser@gmail.com", password: "Password@123" }
];

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
        }

        const user = users.find(user => user.email === email);

        if (!user) {
            return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
        }

        // const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = password === user.password;

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
        }

        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email,
                username: user.username
            }, 
            process.env.JWT_SECRET as string, 
            { expiresIn: '1h' }
        );
        return NextResponse.json(
            {
                message: "Login successful.", 
                token,
                user: user.username
            }, 
            { status: 200 }
        );
        
    } catch (error) {
        return NextResponse.json({ message: "An error occurred during login." }, { status: 500 });
    }
}




