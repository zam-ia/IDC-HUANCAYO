import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) {
          console.error("Auth error:", error);
          return null;
        }

        if (data.user.id === "b76212a6-9b8d-456b-8342-dc50f5147afd") {
          console.log("Forzando rol admin para el usuario");
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
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.email?.split("@")[0],
            role: "miembro",
          };
        }

        console.log("Authorized user:", { id: data.user.id, role: userData?.role });

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
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      console.log("JWT token:", { role: token.role });
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.sub!;
        (session.user as any).role = token.role;
      }
      console.log("Session callback:", { role: (session.user as any)?.role });
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return baseUrl + "/campus/classroom";
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };