import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],

    callbacks: {
        // authorized: async ({ auth }) => {
        //     return !!auth
        // },
        async signIn({ user }) {
            // return user.email === ADMIN_EMAIL
            if (user.email !== ADMIN_EMAIL) {
                return "/unauthorized"
            }
            return true

        }

    },
})
