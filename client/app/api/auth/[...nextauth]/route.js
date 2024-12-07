import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const user = await res.json();

          if (res.ok && user) {
            return user;
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Customize redirect behavior
    async redirect({ url, baseUrl }) {
      console.log("Redirect Callback", { url, baseUrl });
      return url.startsWith(baseUrl) ? baseUrl : url; // Restrict to same-origin
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch("http://127.0.0.1:5000/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
            }),
          });

          if (!res.ok) return false;
          return true;
        } catch (error) {
          console.error("Google signin error:", error);
          return false;
        }
      }
      return true;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
