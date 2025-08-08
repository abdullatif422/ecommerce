import type { NextApiRequest, NextApiResponse } from 'next';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.status(200).json({ message: 'Hello from Next.js!' });
// }

export async function GET(request: NextApiRequest) {
    return new Response('Hello, Next.js!');
}