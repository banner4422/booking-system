/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { Disclosure} from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { motion, useReducedMotion, Variants } from "framer-motion"
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
};

export default function Navigation() {
  const { data: session, status } = useSession();
  const loading = status === 'loading'
  const shouldReduceMotion = useReducedMotion()

  const animation: Variants = shouldReduceMotion ? {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
          duration: 0.3,
        }
    },
  } : {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    },
  }
  
  const animationItem: Variants = shouldReduceMotion ? {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3,
      }
    }
  } : {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3,
      }
    }
  }

    const { asPath } = useRouter()
    const navigation = [
        { name: 'Events', href: '/booking', current: asPath === '/booking' ? true : false },
        { name: 'Information', href: '/information', current: asPath === '/information' ? true : false },
      ]
  return (
    <Disclosure as="nav" className="bg-gray-900">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                <Link href="/" passHref>
                    <motion.img src='/logo.png' width={30} height={30} alt='lol' whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}/>
                </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-lime-500 text-black' : 'text-gray-300 hover:bg-lime-500 hover:text-black',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        variants={animationItem}
                      >
                        {item.name}
                      </motion.a>
                    ))}
                    {
                      loading ? (<></>) : (
                        session ? 
                        (
                          <><motion.a
                              href="/user"
                              className={classNames(
                          asPath === '/user' ? 'bg-lime-500 text-black' : 'text-gray-300 hover:bg-lime-500 hover:text-black',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.9 }}
                              variants={animationItem}
                            >
                              Min bruger
                            </motion.a><motion.a
                              onClick={() => signOut()}
                              className="text-gray-300 hover:bg-lime-500 hover:text-black px-3 py-2 rounded-md text-sm font-medium border border-gray-600"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.9 }}
                              variants={animationItem}
                            >
                                Log ud
                              </motion.a></>
                        )
                        :
                        (
                          <motion.a
                        href="/api/auth/signin"
                        className="text-gray-300 hover:bg-lime-500 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        variants={animationItem}
                      >
                        Log ind
                      </motion.a>
                        )
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <motion.div className="px-2 pt-2 pb-3 space-y-1" initial='hidden' animate='show' variants={animation}>
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-lime-500 text-black' : 'text-gray-300 hover:bg-lime-500 hover:text-black',
                    'block px-3 py-2 rounded-md text-base font-medium text-center'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                  whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        variants={animationItem}
                >
                  {item.name}
                </motion.a>
              ))}
              {
                      loading ? (<></>) : (
                        session ? 
                        (
                          <><motion.a
                              href="/user"
                              className="text-gray-300 hover:bg-lime-500 hover:text-black block px-3 py-2 rounded-md text-base font-medium text-center"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.9 }}
                              variants={animationItem}
                            >
                              Min bruger
                            </motion.a><motion.a
                              onClick={() => signOut()}
                              className="text-gray-300 hover:bg-lime-500 hover:text-black block px-3 py-2 rounded-md text-base font-medium text-center border border-gray-600"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.9 }}
                              variants={animationItem}
                            >
                                Log ud
                              </motion.a></>
                        )
                        :
                        (
                          <motion.a
                        href="/api/auth/signin"
                        className="text-gray-300 hover:bg-lime-500 hover:text-black block px-3 py-2 rounded-md text-base font-medium text-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        variants={animationItem}
                      >
                        Log ind
                      </motion.a>
                        )
                      )
                    }
            </motion.div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    
  )
}