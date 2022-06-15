import { signOut, useSession } from "next-auth/react"
import EventPost from '../../../components/events/eventPost';
import { Fragment } from 'react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import events, { getAllEvents, getAllEventsIds } from '../../api/events';
import { IEventsDTO } from '../../../utils/DTO/eventDTO';
import { getAllParticipantsByEventId, getAllSeatsByEventId, getEvent } from "../../api/events/[id]";
import { DateTime } from "luxon";
import capitalizeFirstLetter from "../../../utils/capitalize";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Order, Participant, Seat } from "@prisma/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const eventData = await getEvent(context.params?.id as string);
    const orderData = await getAllParticipantsByEventId(context.params?.id as string);
    const seatData = await getAllSeatsByEventId(context.params?.id as string);

    return {
        props: {
            event: eventData,
            rows: orderData,
            rows2: seatData
        }
    }
}

export default function AdminEvent({ event, rows, rows2 }: { event: IEventsDTO, rows: Order[], rows2: Seat[] }) {
    const { data: session, status } = useSession();
    const loading = status === 'loading'

    return (
        <div className="py-6 lg:py-12 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center text-center overflow-hidden">
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        Admin side for {event.name}
                    </p>
                    <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        {`${capitalizeFirstLetter(DateTime.fromISO(event.dateStart).setLocale('da').toLocal().toFormat('DDDD'))} - ${capitalizeFirstLetter(DateTime.fromISO(event.dateEnd).setLocale('da').toLocal().toFormat('DDDD'))}`}
                    </p>
                    <br />
                    <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="bg-gray-900">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="text-white">Order ID</TableCell>
                                        <TableCell align="right" className="text-white">Sæde ID</TableCell>
                                        <TableCell align="right" className="text-white" >Deltager ID</TableCell>
                                        <TableCell align="right" className="text-white">Event ID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            className="hover:bg-black"
                                        >
                                            <TableCell component="th" scope="row" className="text-white">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="right" className="text-white">{row.seatId}</TableCell>
                                            <TableCell align="right" className="text-white">{row.participantId}</TableCell>
                                            <TableCell align="right" className="text-white">{row.eventId}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="mt-6">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table2" className="bg-gray-900">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="text-white">Sæde Navn</TableCell>
                                        <TableCell className="text-white" align="right">Optaget</TableCell>
                                        <TableCell className="text-white" align="right">Sæde ID</TableCell>
                                        <TableCell className="text-white" align="right">Bord ID</TableCell>
                                        <TableCell className="text-white" align="right">Event ID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows2.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            className="hover:bg-black"
                                        >
                                            <TableCell component="th" scope="row" className="text-white">
                                                {row.name}
                                            </TableCell>
                                            <TableCell className="text-white" align="right">{row.occupied ? 'Optaget' : 'Ledig'}</TableCell>
                                            <TableCell className="text-white" align="right">{row.id}</TableCell>
                                            <TableCell className="text-white" align="right">{row.tableId}</TableCell>
                                            <TableCell className="text-white" align="right">{row.eventId}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}