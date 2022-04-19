// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from "next"

const secret = process.env.NEXTAUTH_SECRET

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret })
  res.send(JSON.stringify(token, null, 2))
}