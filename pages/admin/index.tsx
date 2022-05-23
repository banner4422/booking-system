import { GetStaticPaths, GetStaticProps, NextPageContext } from "next"
import { useRouter } from "next/router";
import { getSession } from "../../utils/admin";
import { getAllEventsIds } from "../api/events";
import { getEvent } from "../api/events/[id]";
import { getAllSeatsByEvenId } from "../api/seats/[id]";
import { useTable } from 'react-table';
import { getAllSeats } from "../api/seats";
import { Seat } from "@prisma/client";

export const getStaticProps: GetStaticProps = async (context) => {
  const seatsData = await getAllSeats()

  return {
    props: {
      seats: seatsData
    }, revalidate: 60 * 60
  }
}

export default function Admin({ seats }: { seats: Seat[] }) {

  return (
    <div className="py-6 lg:py-12 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center text-center overflow-hidden">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Oversigt over deltagere
          </p>
          {seats.map(seat => <p key={seat.id} className="mt-3 text-center text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-auto">
            {JSON.stringify(seat)}
          </p>)}
        </div>
      </div>
    </div>
  )
}