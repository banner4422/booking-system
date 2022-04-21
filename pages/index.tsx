import { ISeat, ITable } from '../interfaces/interfaces';
import Table from '../components/booking/table';
import { Popover } from '@headlessui/react';
import { ChatIcon, UsersIcon, FireIcon, CogIcon } from '@heroicons/react/outline';
import { signOut, useSession } from "next-auth/react"
import Link from 'next/link';

const features = [
  {
    name: 'Magnificent Moderation Tools',
    description:
      'Case descriptive system for warnings, kicks, mutes and bans, which you can edit on the go. Check cases across servers who has Bento 🍱 and more',
    icon: ChatIcon,
  },
  {
    name: 'Amusing Chat XP System For Your Users',
    description:
      'Users gain XP for every minute they chat and are able to see who has written the most by the server\'s own leaderboard. Every 12th hour, users are able to give a 🍱 to another user. Serverwide leaderboards are available as well',
    icon: UsersIcon,
  },
  {
    name: 'Amazing Extra Features',
    description:
      'Make your personal profile, check the weather or time anywhere in the world, check your horoscope, look up a Tenor GIF, get an Urban Dictionary definition, compare LastFM statistics, set reminders or keyword notifications, and make your own custom tags to remember good memes or memories',
    icon: FireIcon,
  },
  {
    name: 'Accommodating Server Settings',
    description:
      'Do you only care for the moderation tools and think some of the extra features are unnecessary? Bento 🍱 allows you to enable and disable features according to your server and its preferences. Don\'t want a leaderboard for your server? Disable it. Don\'t want GIFs at all? Disable it.',
    icon: CogIcon,
  },
]

export default function Home() {
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
    <div className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl text-center">
            E.g. have list of upcoming events here
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto sm:text-center sm:max-w-xl mx-auto text-center">
            filler
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative bg-gray-800 px-6 py-6 rounded shadow-lg">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-lime-300 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <br></br>
      </div>
      </div>
      </div>
  )
}

/*
import type { GetStaticProps, NextPage } from 'next'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styles from '../styles/Home.module.css'
import { Rnd } from "react-rnd";
import { getData as getTables } from './api/tables';
import { getData as getSeatsByTableId } from './api/seatByTableId';
import { ISeat, ITable } from '../interfaces/interfaces';
import Table from '../components/booking/table';

export const getStaticProps: GetStaticProps = async () => {
  const tablesData = getTables();
  const data = tablesData.map(table => ({
    table: table,
    seats: getSeatsByTableId(table.id)
  }))
  console.log(data)
  return {
    props: {
      data: data
    }
  }
}

export default function Home({ data }: {data : {
  table: ITable;
  seats: ISeat[];
}[]}) {
  // there's something annoyingly wrong with the
  // react zoom pan pinch
  // which affects drag behaviour of the divs
  // so you can't move one individually
  return (
    <div className="py-6 lg:py-12 bg-gray-800">
      <div className="lg:text-center">
      <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl text-center">
      Booking System (Admin) proto
      </p>
      <br />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className='bg-gray-900 px-0 lg:px-6 py-4 rounded shadow-2xl'>
      <div className="flex justify-center w-full mb-3">
                  <button className='ml-3 w-18 p-4 bg-lime-500 rounded'>Zoom In</button>
                  <button className='ml-3 w-18 p-4 bg-lime-500 rounded'>Zoom Out</button>
                  <button className='ml-3 w-18 p-4 bg-lime-500 rounded'>Reset</button>
                </div>
      <div className='flex-row flex-wrap content-start flex h-screen w-full bg-gray-600 overflow-hidden'>                    
          {data && data.map((table, i) => (
            <Table items={table} key={i} />
          ))}
      </div>
      </div>
      </div>
      </div>
      </div>
  )
}
*/