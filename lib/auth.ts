import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || "missing-service-role-key";
const isAuthConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
);

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (
          !isAuthConfigured ||
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) {
          console.error("Auth error:", error);
          return null;
        }

        if (data.user.id === "b76212a6-9b8d-456b-8342-dc50f5147afd") {
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.email?.split("@")[0],
            role: "admin",
          };
        }

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("role, name")
          .eq("id", data.user.id)
          .single();

        if (userError) {
          console.error("User data error:", userError);
        }

        return {
          id: data.user.id,
          email: data.user.email,
          name: userData?.name || data.user.email?.split("@")[0],
          role: userData?.role || "miembro",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || token.id;
        session.user.role = token.role;
      }

      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/campus/classroom`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
