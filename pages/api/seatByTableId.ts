// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ISeat } from '../../interfaces/interfaces'

const mockSeats: ISeat[] = [
    {
        id: 1,
        tableId: 1,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: true
    },
    {
        id: 2,
        tableId: 1,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: true
    },
    {
        id: 3,
        tableId: 1,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: false
    },
    {
        id: 4,
        tableId: 1,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: false
    },
    {
        id: 5,
        tableId: 1,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: false
    },
    {
        id: 6,
        tableId: 1,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: false
    },
    {
        id: 7,
        tableId: 1,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: false
    },
    {
        id: 8,
        tableId: 1,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: false
    },
    {
        id: 9,
        tableId: 1,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: false
    },
    {
        id: 10,
        tableId: 1,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: false
    },
    {
        id: 11,
        tableId: 2,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: false
    },
    {
        id: 12,
        tableId: 2,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: false
    },
    {
        id: 13,
        tableId: 2,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: false
    },
    {
        id: 14,
        tableId: 2,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: false
    },
    {
        id: 15,
        tableId: 2,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: false
    },
    {
        id: 16,
        tableId: 2,
        //x: number,
        //y: number,
        //width: number,
        //height: number,
        name: 'Seat',
        //description: 'Hva så',
        reserved: false
    },
]

export function getData(tableId: number) {
  const getSeats = mockSeats.filter(seat => seat.tableId === tableId);
  return getSeats;
}
