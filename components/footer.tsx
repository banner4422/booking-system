export default function Footer() {
    return (
        <div className="bg-gray-900 mt-4">
            <footer className="bg-gray-900 max-w-screen-2xl mx-auto p-4 py-6">
                <div className="flex flex-wrap">
                    <div className="w-full md:max-w-1/2 mb-4">
                        <p className="text-lime-500 font-medium ">
                            Dplan
                        </p>
                        <p className="text-sm text-gray-400">
                            Prototype
                        </p>
                    </div>
                    <div className="w-full md:max-w-1/2">
                        <p className="text-md uppercase tracking-widest mb1 text-gray-400">
                            Links
                        </p>
                        <p>
                            <a
                                href="https://github.com/banner4422/booking-system"
                                className="text-gray-300 hover:text-white"
                            >
                                GitHub
                            </a>
                            <br />
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}