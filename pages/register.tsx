import { motion, Variants, useTransform } from "framer-motion"
import { GetStaticPaths, GetStaticProps, NextPageContext } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import router from "next/router";
import { useState, useEffect, Fragment, useRef } from "react";
import { Seat } from '@prisma/client';
import Downshift from "downshift";
import Link from "next/link";
import { getToken } from "next-auth/jwt"
import { useRouter } from 'next/router'

export default function Register() {
    const router = useRouter()
    const { data: session, status } = useSession();
    const loading = status === 'loading'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    function onEmailChange(e: React.FormEvent<HTMLInputElement>) {
        setEmail(e.currentTarget.value);
    }

    function onPasswordChange(e: React.FormEvent<HTMLInputElement>) {
        setPassword(e.currentTarget.value);
    }

    function onRepeatPasswordChange(e: React.FormEvent<HTMLInputElement>) {
        setRepeatPassword(e.currentTarget.value);
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        if (password !== repeatPassword) {
            alert("Passwords don't match");
        } else {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            if (response.status === 200) {
                await router.push('/api/auth/signin')
            } else {
                await router.push('/500')
            }
        }
    }

    return (
        <div className="py-6 lg:py-12 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center text-center overflow-hidden">
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        Opret en bruger
                    </p>
                    <form method="post" onSubmit={event => handleSubmit(event)}>
                        <div className="m-auto w-1/2 mt-6">
                            <label
                                className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
                            >
                                Email
                            </label>
                            <div className="flex mt-5">
                                <input
                                    type='text'
                                    placeholder="Skriv din Email her"
                                    className="w-full"
                                    value={email}
                                    onChange={onEmailChange}
                                />
                            </div>
                        </div>
                        <div className="m-auto w-1/2 mt-6">
                            <label
                                className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
                            >
                                Adgangskode
                            </label>
                            <div className="flex mt-5">
                                <input
                                    type='password'
                                    placeholder="Adgangskode"
                                    className="w-full"
                                    value={password}
                                    onChange={onPasswordChange}
                                />
                            </div>
                        </div>
                        <div className="m-auto w-1/2 mt-6">
                            <label
                                className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl"
                            >
                                Gentag adgangskode
                            </label>
                            <div className="flex mt-5">
                                <input
                                    type='password'
                                    placeholder="Gentag adgangskode"
                                    className="w-full"
                                    value={repeatPassword}
                                    onChange={onRepeatPasswordChange}
                                />
                            </div>
                        </div>
                        <div className="mt-14 text-center">
                            <button type='submit' className="mt-14 text-center"><a className="inline-block py-5 px-12 mr-4 bg-lime-500 hover:bg-lime-600 rounded-full text-white font-bold transition duration-200">Opret bruger</a></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}