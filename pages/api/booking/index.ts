import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/prisma";
import { v4 as uuidv4 } from 'uuid';
import { getSession } from "next-auth/react";

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
    const body: { name: string, phoneNumber: number, userId: string, seatId: string, eventId: string } = JSON.parse(JSON.stringify(req.body))
    if (!body) {
        res.json({ message: 'Error' });
        res.status(400).end();
    } else {
        const participant = await prisma.participant.create({
            data: {
                name: body.name,
                phoneNumber: body.phoneNumber,
                userId: body.userId,
                id: uuidv4()
            }
        })
        await prisma.order.create({
            data: {
                seatId: body.seatId,
                eventId: body.eventId,
                participantId: participant.id,
                id: uuidv4()
            }
        })
        await prisma.seat.update({
            where: {
                id: body.seatId
            },
            data: {
                occupied: true
            }
        })
        res.json({ message: 'Success' })
        res.status(200).end();
    }
    return;
}