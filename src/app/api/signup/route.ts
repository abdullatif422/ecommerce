// app/api/signup/route.js

import { neon } from "@neondatabase/serverless";
import bcrypt from "bcrypt";

const sql = neon(process.env.DATABASE_URL || "");

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required." }),
        { status: 400 },
      );
    }

    // Check if a user with this email already exists using a parameterized query.
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (existingUser.length > 0) {
      return new Response(
        JSON.stringify({ error: "An account with this email already exists." }),
        { status: 409 },
      );
    }

    // Securely hash the user's password before storing it.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database.
    const newUser =
      await sql`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword}) RETURNING id, email`;

    if (!newUser || newUser.length === 0) {
      return new Response(JSON.stringify({ error: "Failed to create user." }), {
        status: 500,
      });
    }

    const createdUser = newUser[0];

    return new Response(
      JSON.stringify({
        message: "Account created successfully!",
        user: createdUser,
      }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
    });
  }
}
