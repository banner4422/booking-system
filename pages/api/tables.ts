// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ITable } from '../../interfaces/interfaces'

const mockTables: ITable[] = [
  {
    id: 1,
    x: 150,
    y: 75,
    width: 208,
    height: 400,
    name: 'Table 1',
    description: 'This is Table 1',
    maxSeats: 10
  },
  {
    id: 2,
    x: 750,
    y: 150,
    width: 208,
    height: 200,
    name: 'Table 2',
    description: 'This is Table 2',
    maxSeats: 6
  },
]

export function getData(
  ) {
  return mockTables
}
