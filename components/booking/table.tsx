import React from "react";
import { ISeat, ITable } from "../../interfaces/interfaces";
import Seat from "./seat";
/*
const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
  } as const;
*/
interface items {
    items: {
        table: ITable;
        seats: ISeat[];
    }
    key: number
}

export default function Table({ items, key }: items) {

    return (
        <React.Fragment>
            {/*
            <Rnd
            default={{
                x: items.table.x,
                y: items.table.y,
                width: items.table.width,
                height: items.table.height
            }}
            bounds='parent'
            className='rounded bg-white p-4'
            >
            <p>{items.table.name}</p>
            <br />
            <p>{items.table.description} - Max. {items.table.maxSeats} seats</p>
            {items.seats.map((seat, i) => 
            // style={{'transform': 'translateX(calc(100% - 50px))'}}
            <div key={i} className="py-2">
                <Seat
            key={i}
            id={seat.id}
            tableId={seat.tableId}
            name={seat.name}
            reserved={seat.reserved}
            /> 
            </div>
            )}
            </Rnd>
            */}
        </React.Fragment>
    )
}