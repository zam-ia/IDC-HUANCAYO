import { cache } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const getAuthSession = cache(() => getServerSession(authOptions));
