import { motion, Variants, useTransform } from "framer-motion"
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import router from "next/router";
import { useState, useEffect, Fragment, useRef } from "react";
import { Seat } from '@prisma/client';
import { getEvent } from "../api/events/[id]";
import { IEventsDTO } from "../../utils/DTO/eventDTO";
import { getAllEventsIds } from "../api/events";
import { getAllSeatsByEventId } from "../api/seats/[id]";
import Downshift from "downshift";
import Link from "next/link";
import { getToken } from "next-auth/jwt"
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const eventData = await getEvent(context.params?.id as string);
  const seatsData = await getAllSeatsByEventId(context.params?.id as string)

  return {
    props: {
      eventData: eventData,
      seats: seatsData
    }
  }
}

export default function Booking({ eventData, seats }: { eventData: IEventsDTO, seats: Seat[] }) {
  const router = useRouter()
  const { data: session, status } = useSession();
  const loading = status === 'loading'
  const [zoomValue, setZoomValue] = useState(1);
  const [seat, setSeat] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  function onNameChange(e: React.FormEvent<HTMLInputElement>) {
    setName(e.currentTarget.value);
  }

  function onPhoneNumberChange(e: React.FormEvent<HTMLInputElement>) {
    setPhoneNumber(e.currentTarget.value);
  }

  function setSeatValue(id: string) {
    setSeat(id)
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        phoneNumber: parseInt(phoneNumber),
        // ts ignore because there's middleware ensuring the session is present
        // but i dunno how to indicate that for typescript rn in this rush
        // @ts-ignore
        userId: session.id,
        seatId: seat,
        eventId: eventData.id
      })
    })
    if (response.status === 200) {
      await router.push('/user')
    } else {
      await router.push('/500')
    }
  }

  return (
    <div className="py-6 lg:py-12 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center text-center overflow-hidden">
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            {eventData.name}
          </p>
          <div className="mt-14 text-center">
            <a onClick={() => {
              setZoomValue(zoomValue + 0.25)
            }}
              className="inline-block py-5 px-12 mr-4 bg-lime-500 hover:bg-lime-600 rounded-full text-white font-bold transition duration-200 cursor-pointer"
            >Zoom ind
            </a>
            <a onClick={() => setZoomValue(zoomValue - 0.25)}
              className="inline-block mt-4 py-5 px-12 mr-4 bg-lime-500 hover:bg-lime-600 rounded-full text-white font-bold transition duration-200 cursor-pointer"
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
              src={eventData.map as string}
              alt={eventData.name}
              style={{ scale: zoomValue > 3 ? 3 : zoomValue }}
            />
          </div>
          <br></br>
          <form method="post" onSubmit={event => handleSubmit(event)}>
            <div className='max-w-screen-2xl mx-auto px-3'>
              <Downshift
                onChange={value => setSeatValue(value.id)}
                itemToString={item => (item ? `${item.name}` : 'Error')}
              >
                {({
                  getInputProps,
                  getItemProps,
                  getLabelProps,
                  getMenuProps,
                  isOpen,
                  inputValue,
                  highlightedIndex,
                  selectedItem,
                  getToggleButtonProps
                }) => (
                  <div className="m-auto w-full">
                    <div className="m-auto w-1/2 mt-6">
                      <label
                        {...getLabelProps()}
                        className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
                      >
                        Vælg et sæde
                      </label>
                      <div className="flex mt-5">
                        <input
                          placeholder="Vælg et sæde"
                          className="w-full"
                          {...getInputProps()}
                        />
                        <button
                          type="button"
                          className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:ring-lime-500"
                          {...getToggleButtonProps()}
                          aria-label="toggle menu"
                        >
                          &#8595;
                        </button>
                      </div>
                      <ul className="rounded bg-gray-100" {...getMenuProps()}>
                        {isOpen
                          ? seats
                            .filter(item => item.occupied === false)
                            .filter(
                              item =>
                                !inputValue ||
                                item.id.includes(inputValue)
                            )
                            .map((item, index) => (
                              <li
                                {...getItemProps({
                                  key: item.id,
                                  index,
                                  item,
                                  className: `py-2 px-2 ${highlightedIndex === index
                                    ? "bg-white font-bold"
                                    : "bg-gray-100"
                                    }`
                                })}
                                key={index}
                              >
                                {item.name}
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                  </div>
                )}
              </Downshift>
            </div>
            <div className="m-auto w-1/2 mt-6">
              <label
                className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
              >
                Fulde navn
              </label>
              <div className="flex mt-5">
                <input
                  type='text'
                  placeholder="Skriv dit fulde navn her"
                  className="w-full"
                  value={name}
                  onChange={onNameChange}
                />
              </div>
            </div>
            <div className="m-auto w-1/2 mt-6">
              <label
                className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
              >
                Telefonnummer
              </label>
              <div className="flex mt-5">
                <input
                  type='text'
                  placeholder="Dit telefonnummer"
                  className="w-full"
                  value={phoneNumber}
                  onChange={onPhoneNumberChange}
                />
              </div>
            </div>
            <div className="mt-14 text-center">
              <button type='submit' className="mt-14 text-center"><a className="inline-block py-5 px-12 mr-4 bg-lime-500 hover:bg-lime-600 rounded-full text-white font-bold transition duration-200">Bestil billet</a></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}