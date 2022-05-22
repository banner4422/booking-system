import { ISeat, ITable } from '../interfaces/interfaces';
import Table from '../components/booking/table';
import { Popover } from '@headlessui/react';
import { ChatIcon, UsersIcon, FireIcon, CogIcon } from '@heroicons/react/outline';
import { signOut, useSession } from "next-auth/react"
import Link from 'next/link';
import EventPost from '../components/events/eventPost';
import { Fragment, useEffect, useState } from 'react';
import { Event as LanEvent } from '@prisma/client';
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

export default function Home({ events }: { events: IEventsDTO[] }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading'

  return (
    <div>
      <div className="relative bg-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-gray-800 transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <Popover>
              {({ open }) => (
                <>
                  <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                    <nav
                      className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                      aria-label="Global"
                    >
                      <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                        <div className="flex items-center justify-between w-full md:w-auto">
                          <div className="-mr-2 flex items-center md:hidden">
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                      </div>
                    </nav>
                  </div>


                </>
              )}
            </Popover>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Booking System</span>{' '}
                  <span className="block text-lime-500 xl:inline">Dplan</span>
                </h1>
                {session ?
                  <><p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Velkommen {session.user?.name}
                    <br />
                    {status}
                  </p>
                  </>
                  :
                  <><p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Description here kdfasklfdklsfklfksllk
                  </p><p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                      Description here kdfasklfdklsfklfksllk
                    </p></>
                }
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  {/* manipulate buttons according to login state or admin, perhaps same for descriptions */}
                  {loading ? (<></>) : (session ?
                    <>
                      <div className="rounded-md shadow">
                        <a
                          href=""
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-lime-300 hover:bg-lime-400 hover:text-black md:py-4 md:text-lg md:px-10"
                        >
                          Tjek næste event
                        </a>
                      </div><div className="mt-3 sm:mt-0 sm:ml-3 shadow-lg">
                        <Link href="/api/auth/signin">
                          <a
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-lime-300 hover:bg-lime-400 md:py-4 md:text-lg md:px-10"
                          >
                            FILL
                          </a>
                        </Link>
                      </div>
                    </>
                    :
                    <></>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://dplan.dk/wp-content/uploads/2018/10/Canon-EOS-77D323-2.jpg"
            width={375}
            height={375}
            alt=""
          />
        </div>
      </div>
      <div className="py-12 bg-gray-900 border-b border-gray-500">
        <div className="max-w-2xl mx-auto px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
          <div className=''>
            {events ?
              <Fragment>
                {events.map(event => <EventPost key={event.id} props={event} frontpage={true} />)}
                <div className="mt-14 text-center"><Link href="/events"><a className="inline-block py-5 px-12 mr-4 bg-lime-500 hover:bg-lime-600 rounded-full text-white font-bold transition duration-200">Tjek alle begivenheder</a></Link></div>
              </Fragment>
              :
              <Fragment>
                <p className='text-white mx-auto'>Ingen begivenheder planlagte. Stay tuned!</p>
              </Fragment>
            }
          </div>
          <div className="mx-auto">
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fdplan.dk%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=2506166213017709" width="340" height="500" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  )
}