import { CustomMiddleware } from "@/utils/middleware-chain";
import { updateSession } from "@/utils/supabase/middleware";
import { NextFetchEvent, NextRequest } from "next/server";

export function withSupabaseMiddleware(middleware: CustomMiddleware) {
    return async (request: NextRequest, event: NextFetchEvent) => {
        // The first middleware in the chain has to create the response
        // object and pass it down the chain.
        const response = await updateSession(request);

        // Call the next middleware and pass the request and response
        return middleware(request, event, response);
    };
}