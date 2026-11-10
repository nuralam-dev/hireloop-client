import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";


import type { auth } from "@/lib/auth";

// Type-only import keeps the server out of the client bundle.
// inferAdditionalFields pulls the server's `user.additionalFields` (e.g. role)
// into the client types, enabling signUp/signIn params & session user typing.
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});
