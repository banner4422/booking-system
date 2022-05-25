import { GetStaticPaths, GetStaticProps, NextPageContext } from "next"
import { useRouter } from "next/router";
import { getSession } from "../../utils/admin";
import { getAllEventsIds } from "../api/events";
import { getEvent } from "../api/events/[id]";
import { getAllSeatsByEvenId } from "../api/seats/[id]";
import { useTable } from 'react-table';
import { getAllSeats } from "../api/seats";
import { Seat } from "@prisma/client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Admin() {
  const { data: session, status } = useSession();
  const loading = status === 'loading'
  return (
    <div className="py-6 lg:py-12 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center text-center overflow-hidden">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Velkommen admin {session?.user?.name} ({session?.user?.email})
          </p>
          <div className=" mt-4 text-center"><Link href="/admin/events"><a className="inline-block py-5 px-12 mr-4 bg-lime-500 hover:bg-lime-600 rounded-full text-white font-bold transition duration-200">Begivenheder</a></Link></div>
        </div>
      </div>
    </div>
  )
}