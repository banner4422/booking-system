import { signOut, useSession } from "next-auth/react"
import EventPost from '../components/events/eventPost';
import { Fragment } from 'react';
import { GetStaticProps } from 'next';
import { getAllEvents } from './api/events';
import { IEventsDTO } from '../utils/DTO/eventDTO';

export const getStaticProps: GetStaticProps = async () => {
  const eventsData = await getAllEvents();

  return {
    props: {
      events: eventsData
    }, revalidate: 60 * 60
  }
}

export default function Events({ events }: { events: IEventsDTO[] }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading'

  return (
    <div className="py-6 lg:py-12 bg-gray-800">
      {events ?
        <Fragment>
          {events.map(event => <EventPost key={event.id} props={event} frontpage={false} />)}
        </Fragment>
        :
        <Fragment>
          <p className='text-white mx-auto'>Ingen begivenheder planlagte. Stay tuned!</p>
        </Fragment>
      }
    </div>
  )
}