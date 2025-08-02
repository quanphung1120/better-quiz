"use server";

import { headers } from "next/headers";
import { auth } from "./auth";

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
}
