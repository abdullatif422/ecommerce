import { neon } from "@neondatabase/serverless";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

const sql = neon(process.env.DATABASE_URL || "");
const jwtSecret = process.env.JWT_SECRET;

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                type: string
 *               format: password
 * *     responses:
 *       200:
 *         description: Successful login with JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *       400:
 *         description: Bad request, missing email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized, invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
