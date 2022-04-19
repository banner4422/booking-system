export interface IUser {
    id: number,
    seatId: number,
    name: string,
}

export interface ISeat {
    id: number,
    tableId: number,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    name: string,
    description?: string,
    reserved: boolean
}

export interface ITable {
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    name: string,
    description: string,
    maxSeats: number
}