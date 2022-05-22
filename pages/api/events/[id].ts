// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from 'next'
import { IEventsDTO } from "../../../utils/DTO/eventDTO";
import { DateTime } from "luxon";
import { prisma } from "../../../utils/prisma";

const secret = process.env.NEXTAUTH_SECRET

async function getAllEventsDatabase(id: string) {
    let event = await prisma.event.findUnique({
        where: {
            id: id
        }
    })
    let data: IEventsDTO
    if (event) {
        data = {
            ...event,
            dateStart: DateTime.fromJSDate(event.dateStart).toISO(),
            dateEnd: DateTime.fromJSDate(event.dateEnd).toISO(),
        }
        return data;
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
    const data = await getAllEventsDatabase(id);
    if (data) {
        res.status(200).json(data)
    } else {
        res.status(400)
    }
    return;
}

export async function getEvent(id: string | string[]) {
    let parseId = id
    if (Array.isArray(parseId)) {
        parseId = parseId.join()
    }
    const data = await getAllEventsDatabase(parseId);
    return data;
}