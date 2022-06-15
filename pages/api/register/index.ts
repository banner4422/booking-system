import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { getSession } from "next-auth/react";

const secret = process.env.NEXTAUTH_SECRET

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (session) {
        res.send({
            content:
                "This is protected content. You can access this content because you are signed in.",
        })
    } else {
        res.send({
            error: "You must be signed in to view the protected content on this page.",
        })
    }
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const body: { email: string, password: string } = JSON.parse(JSON.stringify(req.body))
    if (!body) {
        res.json({ message: 'Error' });
        res.status(400).end();
    } else {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword
            }
        })
        res.json({ message: 'Success' })
        res.status(200).end();
    }
    return;
}