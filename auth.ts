import NextAuth, { User } from "next-auth";
import "next-auth/jwt";

import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same domain
      else if (new URL(url).origin === baseUrl) return url;
      console.log(url, baseUrl, "Redirect in auth.js");

      return baseUrl;
    },
    async jwt({ token, trigger, session, account, profile }) {
      if (account?.provider === "google") {
        // 1. Make HTTP POST request to social login endpoint in your backend
        const backendSocialLoginUrl =
          "http://localhost:8081/api/auth/social-login";
        try {
          const response = await fetch(backendSocialLoginUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: profile?.name,
              email: profile?.email,
              image: profile?.picture,
              provider: account?.provider,
            }),
          });

          if (!response.ok) {
            return token;
          }
          const userData = await response.json();
          // console.log(userData, "Response after signin in auth.js");

          if (userData.user && userData.accessToken) {
            return {
              ...token,
              name: userData.user.name,
              id: userData.user.id,
              accessToken: userData.accessToken,
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
      // console.log(session, "Session in auth.js");
      return session;
    },
  },
  pages: {
    signIn: "/join",
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
