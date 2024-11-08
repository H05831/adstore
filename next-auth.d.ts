// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { AdapterUser as OriginalAdapterUser } from "next-auth/adapters";
import { UserRole } from "@prisma/client";

// Extend default user with role
interface ExtendedUser extends DefaultUser {
  id: string;
  role: UserRole;
  email: string;
  name: string;
}

declare module "next-auth" {
  interface User extends ExtendedUser {}
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser extends OriginalAdapterUser {
    role?: UserRole;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
    email?: string;
    name?: string;
  }
}
