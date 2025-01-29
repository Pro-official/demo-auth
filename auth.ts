// import NextAuth from "next-auth";
// import "next-auth/jwt";
// import Google from "next-auth/providers/google";
// import { JWT } from "next-auth/jwt";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   debug: !!process.env.AUTH_DEBUG,
//   theme: { logo: "https://authjs.dev/img/logo-sm.png" },
//   providers: [
//     Google,
//     // Credentials({
//     //   name: "Credentials",
//     //   credentials: {
//     //     email: {
//     //       label: "Username",
//     //       type: "text",
//     //       placeholder: "promise@gmail.com",
//     //     },
//     //     password: {
//     //       label: "Password",
//     //       type: "password",
//     //       placeholder: "*******",
//     //     },
//     //   },
//     // async authorize(credentials): Promise<User | null> {
//     //   console.log(credentials);

//     //   const backendLoginUrl = "http://localhost:8081/api/auth/login";
//     //   try {
//     //     // 2. Make HTTP POST request to your backend
//     //     const response = await fetch(backendLoginUrl, {
//     //       method: "POST",
//     //       headers: { "Content-Type": "application/json" },
//     //       body: JSON.stringify({
//     //         email: credentials?.email,
//     //         password: credentials?.password,
//     //       }),
//     //     });
//     //     if (!response.ok) {
//     //       return null;
//     //     }
//     //     // 3. Process the response from the backend
//     //     const userData = await response.json();
//     //     console.log(userData, "Response after signin in auth.js");

//     //     if (userData.user && userData.accessToken) {
//     //       // The user is valid and we have received a JWT from backend. Add user data to session
//     //       return {
//     //         id: userData.user.id,
//     //         name: userData.user.name,
//     //         userName: userData.user.userName,
//     //         email: userData.user.email,
//     //       };
//     //     } else {
//     //       return null; // Invalid credentials
//     //     }
//     //   } catch (error) {
//     //     console.log(error);
//     //     return null; // Handle request errors
//     //   }
//     // },
//     // }),
//   ],
//   basePath: "/auth",
//   session: { strategy: "jwt" },
//   callbacks: {
//     authorized({ request, auth }) {
//       const { pathname } = request.nextUrl;
//       if (pathname === "/middleware-example") return !!auth;
//       return true;
//     },
//     async jwt({ token, trigger, session, account, profile }): Promise<JWT> {
//       if (account?.provider === "google") {
//         // 1. Make HTTP POST request to social login endpoint in your backend
//         const backendSocialLoginUrl =
//           "http://localhost:8081/api/auth/social-login";
//         try {
//           const response = await fetch(backendSocialLoginUrl, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               name: profile?.name,
//               email: profile?.email,
//               image: profile?.picture,
//               provider: account?.provider,
//             }),
//           });

//           if (!response.ok) {
//             return token;
//           }
//           const userData = await response.json();
//           if (userData.user && userData.accessToken) {
//             return {
//               ...token,
//               name: userData.user.name,
//               id: userData.user.id,
//               accessToken: userData.accessToken,
//             };
//           }
//           return token;
//         } catch (error) {
//           console.log(error);
//           return token;
//         }
//       }
//       if (trigger === "update") token.name = session.user.name;
//       if (session?.user?.id) token.id = session.user.id;
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.accessToken = token.accessToken;
//         if (token.sub) session.user.id = token.sub;
//       }
//       console.log(session, "Session in auth.js");
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/signin",
//   },
// });

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//     user?: {
//       id?: string;
//     };
//   }
//   interface User {
//     userName?: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string;
//     id?: string;
//   }
// }

import NextAuth, { User } from "next-auth";
import "next-auth/jwt";

import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

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
        const users = [
          {
            id: "test-user-1",
            userName: "test1",
            name: "Test 1",
            password: "pass",
            email: "test1@donotreply.com",
          },
          {
            id: "test-user-2",
            userName: "test2",
            name: "Test 2",
            password: "pass",
            email: "test2@donotreply.com",
          },
        ];
        const user = users.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );
        return user
          ? { id: user.id, name: user.name, email: user.email }
          : null;
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
    jwt({ token, trigger, session, account }) {
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
