// app/api/login/route.ts

import { neon } from "@neondatabase/serverless";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

// Initialize the Neon database client with your connection string.
// Make sure your DATABASE_URL and JWT_SECRET are set in your environment variables.
const sql = neon(process.env.DATABASE_URL || "");
const jwtSecret = process.env.JWT_SECRET;

// Define a type for the user object from the database.
interface User {
  id: number;
  email: string;
  password: string;
}

/**
 * Handles POST requests for user login.
 * Finds a user, verifies their password, and generates a JWT token.
 */
export async function POST(request: NextRequest) {
  try {
    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is not set.");
    }

    const { email, password }: { email?: string; password?: string } =
      await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Find the user in the database using a parameterized query to prevent SQL injection.
    const users =
      await sql`SELECT id, email, password FROM users WHERE email = ${email}`;
    const user = users[0];

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Compare the provided password with the stored hashed password.
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Invalid credentials." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // On successful login, generate a JWT token.
    const token = jwt.sign(
      { userId: user.id, email: user.email }, // The payload for the token.
      jwtSecret,
      { expiresIn: "1h" }, // The token will expire in 1 hour.
    );

    // Return the token and user information.
    const duplicateUser = { ...user }; // Create a copy of the user object.
    // Exclude the password from the response.
    if (!duplicateUser) {
      return new Response(JSON.stringify({ error: "User not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    delete duplicateUser.password; // Remove the password field from the user object.
    return new Response(
      JSON.stringify({
        message: "Login successful!",
        token: token,
        user: { ...duplicateUser },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Login Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
