import { Seat } from "@prisma/client";
import { motion, Variants } from "framer-motion"
import { GetServerSideProps, GetStaticProps, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import EventPost from "../../components/events/eventPost";
import { IEventsDTO } from "../../utils/DTO/eventDTO";
import { getEventsForUser } from "../api/events/[id]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userSessionData = await getSession(context);
  const eventsData = await getEventsForUser(userSessionData!.id as string);

  return {
    props: {
      events: eventsData
    }
  }
}

export default function User({ events }: { events: { event: IEventsDTO, seat: Seat }[] }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading'
  return (
    <div className="py-6 lg:py-12 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center text-center overflow-hidden">
          {loading ? (<></>) : (
            <><p
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              {session?.user?.name}
            </p>
              <br>
              </br>
              <div className='max-w-screen-2xl mx-auto px-3'>
                <p className=" text-white">{session?.user?.email}</p>

                {events ? events.map(event => (
                  <>
                    <br />
                    <EventPost key={event.event.id} props={event.event} frontpage={false} seat={event.seat} />
                  </>
                ))
                  : (
                    <div>
                      <p className=" text-white">Du er ikke tilmeldt nogle begivenheder endnu.</p>
                    </div>
                  )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}