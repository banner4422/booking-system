// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from 'next'
import { DateTime } from "luxon";
import prisma from "../../../utils/prisma";

const secret = process.env.NEXTAUTH_SECRET

async function getAllSeatsByEventIdDatabase(id: string) {
    let event = await prisma.seat.findMany({
        where: {
            eventId: id
        },
        orderBy: {
            name: 'asc'
        }
    })
    if (event) {
        return event;
    } else {
        return null;
    }
}

async function getSeatDatabase(id: string) {
    let event = await prisma.seat.findUnique({
        where: {
            id: id
        }
    })
    if (event) {
        return event;
    } else {
        return null;
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    let { id } = req.query
    if (Array.isArray(id)) {
        id = id.join()
    }
    const data = await getAllSeatsByEventIdDatabase(id);
    if (data) {
        res.status(200).json(data)
    } else {
        res.status(400)
    }
    return;
}

export async function getAllSeatsByEventId(id: string | string[]) {
    let parseId = id
    if (Array.isArray(parseId)) {
        parseId = parseId.join()
    }
    const data = await getAllSeatsByEventIdDatabase(parseId);
    return data;
}