
import Link from "next/link";

export default function Information() {
    return (
        <div className="py-6 lg:py-12 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center text-center overflow-hidden">
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        Information
                    </p>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        Dette er booking system for dplan
                    </p>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        Klik her for at læse om dplan
                    </p>

                    <div className=" mt-4 text-center"><Link href="https://dplan.dk/"><a className="inline-block py-5 px-12 mr-4 bg-lime-500 hover:bg-lime-600 rounded-full text-white font-bold transition duration-200">dplan</a></Link></div>
                </div>
            </div>
        </div>
    )
}