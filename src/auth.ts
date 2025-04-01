import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import passwordHasher from "@/utils/password";
import { getUserFromDb } from "@/utils/db";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);

          const user = await getUserFromDb(email);

          if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error("Usuario y/o contraseña incorrectos");
          }        

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
        }
      }
    }),
  ],
});