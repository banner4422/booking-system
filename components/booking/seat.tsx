import React, { CSSProperties } from "react";
import { ISeat, ITable } from "../../interfaces/interfaces";
/*
const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
  } as const;
*/
interface seatData {
    id: number,
    tableId: number,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    name: string,
    description?: string,
    reserved: boolean,
    key: number
}

export default function Seat({ id, tableId, x, y, width, height, name, description, reserved, key }: seatData) {

    return (
        <React.Fragment>
            {reserved ?
                // style={{'transform': `translateX(calc(100px))`}}
                <div className="bg-red-500 w-12 h-12 rounded-full border-2 border-black" style={{ 'transform': 'translate(-65px, -170%)' }}>
                    <p className="text-black">{name} {id}</p>
                </div>
                :
                <div className="bg-green-500 w-12 h-12 rounded-full border-2 border-black" style={{ 'transform': 'translate(-65px, -170%)' }}>
                    <p className="text-black">{name} {id}</p>
                </div>}
        </React.Fragment>
    )
}