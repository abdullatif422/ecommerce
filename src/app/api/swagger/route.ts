// app/api/swagger/route.ts

import { NextRequest, NextResponse } from 'next/server';

// Define your OpenAPI specification here as a JSON object.
// This is the core of your API documentation.
const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Authentication API',
    version: '1.0.0',
    description: 'API for user login and signup with JWT support.',
  },
  servers: [
    {
      url: '/',
      description: 'Local server',
    },
  ],
  paths: {
    '/api/login': {
      post: {
        summary: 'User Login',
        description: 'Authenticates a user and returns a JWT token.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', format: 'password' },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    token: { type: 'string' },
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'number' },
                        email: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': { description: 'Missing email or password' },
          '401': { description: 'Invalid credentials' },
          '500': { description: 'Internal server error' },
        },
      },
    },
    '/api/signup': {
      post: {
        summary: 'User Signup',
        description: 'Registers a new user.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', format: 'password' },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Account created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'number' },
                        email: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': { description: 'Missing email or password' },
          '409': { description: 'Email already exists' },
          '500': { description: 'Internal server error' },
        },
      },
    },
  },
};

/**
 * Handles GET requests to serve the OpenAPI specification.
 * @param {NextRequest} req
 */
export async function GET(req: NextRequest) {
  return new Response(JSON.stringify(openApiSpec), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
