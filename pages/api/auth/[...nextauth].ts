import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "../../../utils/prisma"


export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // https://next-auth.js.org/configuration/providers/oauth
  debug: true,
  providers: [
    /*
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    */
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { username: 'bob', password: 'test' }

        if (user.username === credentials?.username && user.password === credentials.password) {
          // Any object returned will be saved in `user` property of the JWT
          return { id: '1', name: 'bob', email: 'bob@mail.dk' }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  theme: {
    colorScheme: "auto",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user?.id === '1') {
        token.userRole = "admin"
        return token
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
})