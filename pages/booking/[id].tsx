import { motion, Variants, useTransform } from "framer-motion"
import { GetStaticPaths, GetStaticProps, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import router from "next/router";
import { useState, useEffect, Fragment, useRef } from "react";
import { Seat } from '@prisma/client';
import { getEvent } from "../api/events/[id]";
import { IEventsDTO } from "../../utils/DTO/eventDTO";
import { getAllEventsIds } from "../api/events";
import { getAllSeatsByEvenId } from "../api/seats/[id]";

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const eventIds = await getAllEventsIds();

  const paths = eventIds.map((eventId) => ({
    params: { id: eventId }
  }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const eventData = await getEvent(context.params?.id as string);
  const seatsData = await getAllSeatsByEvenId(context.params?.id as string)

  return {
    props: {
      event: eventData,
      seats: seatsData
    }, revalidate: 60 * 60
  }
}

export default function Booking({ event, seats }: { event: IEventsDTO, seats: Seat[] }) {
  const [zoomValue, setZoomValue] = useState(1);

  return (
    <div className="py-6 lg:py-12 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center text-center overflow-hidden">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            {event.name}
          </p>
          <div className="mt-14 text-center">
            <a onClick={() => {
              setZoomValue(zoomValue + 0.25)
            }}
              className="inline-block py-5 px-12 mr-4 bg-lime-500 hover:bg-lime-600 rounded-full text-white font-bold transition duration-200 cursor-pointer"
            >Zoom ind
            </a>
            <a onClick={() => setZoomValue(zoomValue - 0.25)}
              className="inline-block py-5 px-12 mr-4 bg-lime-500 hover:bg-lime-600 rounded-full text-white font-bold transition duration-200 cursor-pointer"
            >Zoom ud
            </a>
          </div>
          <div className='bg-gray-900 mx-auto my-auto p-2 mt-8 rounded shadow-lg bg-opacity-50 w-full overflow-hidden'>
            <motion.img
              drag
              dragConstraints={{
                top: zoomValue > 3 ? -150 * 3 : -150 * zoomValue,
                left: zoomValue > 3 ? -200 * 3 : -200 * zoomValue,
                right: zoomValue > 3 ? 200 * 3 : 200 * zoomValue,
                bottom: zoomValue > 3 ? 150 * 3 : 150 * zoomValue,
              }}
              className='mx-auto shadow-lg object-contain w-full h-full'
              src={event.map as string}
              alt={event.name}
              style={{ scale: zoomValue > 3 ? 3 : zoomValue }}
            />
          </div>
          <br></br>
          <div className='max-w-screen-2xl mx-auto px-3'>

          </div>
        </div>
      </div>
    </div>
  )
}