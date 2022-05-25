// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from 'next'
import { IEventsDTO } from "../../../utils/DTO/eventDTO";
import { DateTime } from "luxon";
import { prisma } from "../../../utils/prisma";
import { Event, Seat } from "@prisma/client";
import { getSession } from "next-auth/react";

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

async function getAllParticipantsByEventIdDatabase(id: string) {
    let data = await prisma.order.findMany({
        where: {
            eventId: id
        }
    })
    if (data) {
        return data;
    } else {
        return null;
    }
}

async function getAllSeatsByEventIdDatabase(id: string) {
    let data = await prisma.seat.findMany({
        where: {
            eventId: id
        }
    })
    if (data) {
        return data;
    } else {
        return null;
    }
}

async function getEventsForUserDatabase(id: string) {
    let data = await prisma.participant.findMany({
        where: {
            userId: id
        }
    })
    let events: { event: Event, seat: Seat }[] = []
    if (data) {
        data.forEach(async element => {
            let getOrder = await prisma.order.findFirst({
                where: {
                    participantId: element.id
                }
            })
            let getEvent = await prisma.event.findFirst({
                where: {
                    id: getOrder?.eventId
                }
            })
            let getSeat = await prisma.seat.findFirst({
                where: {
                    id: getOrder?.seatId
                }
            })
            events.push({ event: getEvent as Event, seat: getSeat as Seat })
        });
        return events
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

export async function getAllParticipantsByEventId(id: string | string[]) {
    let parseId = id
    if (Array.isArray(parseId)) {
        parseId = parseId.join()
    }
    const data = await getAllParticipantsByEventIdDatabase(parseId);
    return data;
}

export async function getAllSeatsByEventId(id: string | string[]) {
    let parseId = id
    if (Array.isArray(parseId)) {
        parseId = parseId.join()
    }
    const data = await getAllSeatsByEventIdDatabase(parseId);
    return data;
}

export async function getEventsForUser(id: string | string[]) {
    let parseId = id
    if (Array.isArray(parseId)) {
        parseId = parseId.join()
    }
    const data = await getEventsForUserDatabase(parseId);
    return data;
}