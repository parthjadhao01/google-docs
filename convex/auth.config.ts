// export default {
//     providers : [
//         {
//             domain : "https://hardy-gar-67.clerk.accounts.dev",
//             applicationId : "convex"
//         }
//     ]
// }

import { AuthConfig } from "convex/server";

export default {
    providers: [
        {
            // Replace with your own Clerk Issuer URL from your "convex" JWT template
            // or with `process.env.CLERK_JWT_ISSUER_DOMAIN`
            // and configure CLERK_JWT_ISSUER_DOMAIN on the Convex Dashboard
            // See https://docs.convex.dev/auth/clerk#configuring-dev-and-prod-instances
            domain: "https://hardy-gar-67.clerk.accounts.dev",
            applicationID: "convex",
        },
    ]
} satisfies AuthConfig;