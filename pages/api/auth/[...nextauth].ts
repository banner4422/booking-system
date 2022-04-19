import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
//import FacebookProvider from "next-auth/providers/facebook"

export default NextAuth({
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        /*
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
      }),
      */
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
    ],
    theme: {
      colorScheme: "auto",
    },
    callbacks: {
      async jwt({ token }) {
        token.userRole = "admin"
        return token
      },
    },
  })