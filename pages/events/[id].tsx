import { Popover } from '@headlessui/react';
import { signOut, useSession } from "next-auth/react"
import { DateTime } from 'luxon';
import capitalizeFirstLetter from '../../utils/capitalize';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getEvent } from '../api/events/[id]';
import { IEventsDTO } from '../../utils/DTO/eventDTO';
import { getAllEventsIds } from '../api/events';

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const eventIds = await getAllEventsIds();

  const paths = eventIds.map((eventId) => ({
    params: { id: eventId }
  }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const eventData = await getEvent(context.params?.id as string);

  return {
    props: {
      event: eventData
    }, revalidate: 1
  }
}

export default function Events({ event }: { event: IEventsDTO }) {
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
                  <span className="block text-lime-500 xl:inline">{event.name}</span>{' '}
                </h1>
                <p className="mt-3 text-lg text-gray-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {event.address}
                </p>
                <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Starter {`${capitalizeFirstLetter(DateTime.fromISO(event.dateStart).setLocale('da').toLocal().toFormat('DDDD'))}`} klokken {`${capitalizeFirstLetter(DateTime.fromISO(event.dateStart).setLocale('da').toLocal().toFormat('T'))}`}
                  <br />
                  Slutter {`${capitalizeFirstLetter(DateTime.fromISO(event.dateEnd).setLocale('da').toLocal().toFormat('DDDD'))}`} klokken {`${capitalizeFirstLetter(DateTime.fromISO(event.dateEnd).setLocale('da').toLocal().toFormat('T'))}`}
                </p>
                <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {event.description}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  {/* manipulate buttons according to login state or admin, perhaps same for descriptions */}

                  <div className="rounded-md shadow">
                    <a
                      href={`/booking/${event.id}`}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-lime-300 hover:bg-lime-400 hover:text-black md:py-4 md:text-lg md:px-10"
                    >
                      Køb en billet
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={event.image ? event.image : "https://dplan.dk/wp-content/uploads/2018/10/Canon-EOS-77D323-2.jpg"}
            width={375}
            height={375}
            alt=""
          />
        </div>
      </div>
    </div>
  )
}