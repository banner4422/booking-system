import { DateTime } from 'luxon'
import Link from "next/link";
import capitalizeFirstLetter from "../../utils/capitalize";
import { IEventsDTO } from "../../utils/DTO/eventDTO";

interface eventPost {
  props: IEventsDTO
  frontpage: boolean
}

export default function EventPost({ props, frontpage }: eventPost) {
  return (
    <div className="container px-4 mx-auto">
      <div className="flex flex-wrap -m-6">
        <div className={frontpage ? "relative w-full p-6" : "relative w-full lg:w-2/3 lg:mx-auto p-6"}>
          <div className={frontpage ? "relative z-10 bg-gray-800 rounded-lg" : "relative z-10 bg-gray-900 rounded-lg"}>
            <div className="relative h-52 cursor-pointer" >
              <Link href={`events/${props.id}`} passHref>
                <img className="w-full h-full rounded-lg object-cover object-top" src={props.image ? props.image : "https://dplan.dk/wp-content/uploads/2018/10/Canon-EOS-77D323-2.jpg"} alt={props.name} />
              </Link>
            </div>
            <div className="px-14 pb-4">
              <br />
              <a className="inline-block pt-4 text-2xl text-white hover:text-gray-100 font-bold border-t border-lime-400" href={`events/${props.id}`}>{props.name}</a>
            </div>
            <a className="px-14 pb-5 inline-block text-sm text-gray-300">{`${capitalizeFirstLetter(DateTime.fromISO(props.dateStart).setLocale('da').toLocal().toFormat('DDDD'))} - ${capitalizeFirstLetter(DateTime.fromISO(props.dateEnd).setLocale('da').toLocal().toFormat('DDDD'))}`}</a>

          </div>
        </div>
      </div>
    </div>
  )
}