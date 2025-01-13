import NextAuth, { User } from "next-auth";
import "next-auth/jwt";

import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "promise@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials): Promise<User | null> {
        console.log(credentials, "from auth");

        const backendLoginUrl = "http://localhost:8080/api/login";
        try {
          // 2. Make HTTP POST request to your backend
          const response = await fetch(backendLoginUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          if (!response.ok) {
            return null;
          }
          // 3. Process the response from the backend
          const userData = await response.json();
          if (userData.user && userData.accessToken) {
            // The user is valid and we have received a JWT from backend. Add user data to session
            return {
              id: userData.user.id,
              name: userData.user.name,
              email: userData.user.email,
            };
          } else {
            return null; // Invalid credentials
          }
        } catch (error) {
          console.log(error);
          return null; // Handle request errors
        }
      },
    }),
  ],
  basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },
    async jwt({ token, trigger, session, account, profile }) {
      if (account?.provider === "google") {
        // 1. Make HTTP POST request to social login endpoint in your backend
        const backendSocialLoginUrl = "http://localhost:8080/api/social-login";
        try {
          const response = await fetch(backendSocialLoginUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: profile?.name,
              email: profile?.email,
              image: profile?.image,
            }),
          });

          if (!response.ok) {
            return token;
          }
          const userData = await response.json();
          if (userData.user && userData.accessToken) {
            return {
              ...token,
              name: userData.user.name,
            };
          }
          return token;
        } catch (error) {
          console.log(error);
          return token;
        }
      }
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  // experimental: { enableWebAuthn: true },
});

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
