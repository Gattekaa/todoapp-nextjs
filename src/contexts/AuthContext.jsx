import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
var jwt = require('jsonwebtoken');
import Router from "next/router";
import connection from "@/config/connection";
import { NextResponse, NextRequest } from 'next/server'

import { toast } from "react-toastify";

export const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const isAuthenticated = !!user;

    useEffect(() => {
        const { token } = parseCookies()

        if(token) {
            const data = connection.get('/isexpired').then(() => {
                if(!user) {
                    const {user} = jwt.decode(token, process.env.SECRET)
                    setUser(user)
                }
                return
            }).catch(() => {
                destroySession()
            })
        }
    }, [])

    async function signIn({ username, password }) {
        try {
            const {data: {token, user}} = await connection.post('/signin', {
                username,
                password
            })
            setCookie(undefined, 'token', token, {
                maxAge: 60 * 60 * 1, // 1 hour
            })
            setUser(user)
            Router.push('/')

        }catch({response: {data: {message}}}) {
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    async function destroySession() {
        destroyCookie(undefined, 'token')
        return Router.push('/login')
          
    }

    async function signUp({ username, password, password_confirm }) {
        try {
            const {data: {token} } = await connection.post('/user', {
                username,
                password,
                password_confirm
            })
            setCookie(undefined, 'token', token, {
                maxAge: 60 * 60 * 1, // 1 hour
            })
            const {user} = jwt.decode(token, process.env.SECRET)
            setUser(user)
            Router.push('/')

        }catch({response: {data: {message}}}) {
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    

    return (
        <>
            <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, destroySession }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

