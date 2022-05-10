import { ISeat, ITable } from '../interfaces/interfaces';
import Table from '../components/booking/table';
import { Popover } from '@headlessui/react';
import { ChatIcon, UsersIcon, FireIcon, CogIcon } from '@heroicons/react/outline';
import { signOut, useSession } from "next-auth/react"
import Link from 'next/link';
import EventPost from '../components/events/eventPost';
import { Fragment, useEffect, useState } from 'react';
import { Event as LanEvent } from '@prisma/client';

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === 'loading'

  const [data, setData] = useState([] as LanEvent[])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
  
  return (
    <div className="py-6 lg:py-12 bg-gray-800">
        {data ? 
         <Fragment>
           {data.map(event => <EventPost key={event.id} props={event} frontpage={false}/>)}
         </Fragment>
         :
         <Fragment>
           <p className='text-white mx-auto'>Ingen begivenheder planlagte. Stay tuned!</p>
         </Fragment>
         }
    </div>
  )
}