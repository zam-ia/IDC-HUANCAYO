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
const ROLE_REFRESH_INTERVAL_MS = 5 * 60 * 1000;

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

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("role, name, is_active, avatar_url")
          .eq("id", data.user.id)
          .single();

        if (userError) {
          console.error("User data error:", userError);
        }

        if (userData?.is_active === false) {
          return null;
        }

        return {
          id: data.user.id,
          email: data.user.email,
          name: userData?.name || data.user.email?.split("@")[0],
          image: userData?.avatar_url || null,
          role: userData?.role || "student",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.picture = user.image;
        token.roleSyncedAt = Date.now();
      } else {
        const userId = token.id || token.sub;
        const roleIsStale =
          !token.roleSyncedAt ||
          Date.now() - token.roleSyncedAt >= ROLE_REFRESH_INTERVAL_MS;

        if (isAuthConfigured && userId && roleIsStale) {
          const { data: freshUser, error: roleError } = await supabase
            .from("users")
            .select("role, is_active")
            .eq("id", userId)
            .maybeSingle();

          if (roleError) {
            console.error("Role refresh error:", roleError);
          } else if (freshUser) {
            token.role = freshUser.is_active === false ? "inactive" : freshUser.role;
            token.roleSyncedAt = Date.now();
          }
        }
      }

      if (trigger === "update" && session?.user) {
        token.name = session.user.name ?? token.name;
        token.picture = session.user.image ?? token.picture;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || token.id;
        session.user.role = token.role;
        session.user.image = token.picture || null;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/campus/classroom`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
