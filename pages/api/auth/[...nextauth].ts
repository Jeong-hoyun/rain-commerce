import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from './../../../lib/prismadb';
import { google_client, google_secret } from '../../../config/googleAuth';


export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: google_client,
      clientSecret: google_secret,
    }),
  ],
  session:{
    strategy:"database",
    maxAge:30*24*60*60
  }
})