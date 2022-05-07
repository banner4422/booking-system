import { motion, Variants } from "framer-motion"
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";

const animation: Variants = {
  hidden: { opacity: 0 },
  show: {
      opacity: 1,
      transition: {
        duration: 2,
      }
  },
}

export default function User() {
    const { data: session, status } = useSession();
    const loading = status === 'loading'
    return (
        <div className="py-6 lg:py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center text-center overflow-hidden">
          {loading ? (<></>) : (
            <><motion.p initial="hidden"
                            animate="show"
                            variants={animation} className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                            {session?.user?.name}
                        </motion.p><motion.div className='bg-gray-900 mx-auto my-auto p-2 mt-8 w-64 rounded shadow-lg bg-opacity-50' initial="hidden"
                            animate="show"
                            variants={animation}>
                                <motion.img width={256} height={256} initial="hidden"
                                    animate="show"
                                    variants={animation} className='mx-auto shadow-lg' src={session?.user?.image as string}></motion.img>
                            </motion.div><br></br><div className='max-w-screen-2xl mx-auto px-3'>
                                <p className=" text-white">{session?.user?.email}</p>
                            </div></>
          )}
                    </div>
        </div>
      </div>
    )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}