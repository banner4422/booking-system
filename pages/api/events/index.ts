// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from 'next'
import { DateTime } from "luxon";
import { IEventsDTO } from "../../../utils/DTO/eventDTO";
import prisma from "../../../utils/prisma";
import { getSession } from "next-auth/react";

const secret = process.env.NEXTAUTH_SECRET

async function getAllEventsDatabase() {
    let events = await prisma.event.findMany({
        orderBy: {
            dateStart: 'asc'
        }
    });
    const data: IEventsDTO[] = events.map(function (x) {
        const y = {
            ...x,
            dateStart: DateTime.fromJSDate(x.dateStart).toISO(),
            dateEnd: DateTime.fromJSDate(x.dateEnd).toISO(),
        }
        return y;
    })
    return data;
}

async function getAllEventsIdsDatabase() {
    let events = await prisma.event.findMany();
    const data = events.map(x => x.id)
    return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {

    const data = await getAllEventsDatabase();
    res.status(200).json(data);
    res.end();
    return;
}

export async function getAllEvents() {
    const data = await getAllEventsDatabase();
    return data;
}

export async function getAllEventsIds() {
    const data = await getAllEventsIdsDatabase();
    return data;
}