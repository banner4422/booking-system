import { DateTime } from "luxon"

export interface IEventsDTO {
    id: string
    name: string
    dateStart: string
    dateEnd: string
    image: string | null
    description: string | null
    map: string | null
    address: string | null
}