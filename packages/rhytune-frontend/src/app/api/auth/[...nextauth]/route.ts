import NextAuth, { NextAuthConfig } from "next-auth"
import GoogleProviders from "next-auth/providers/google"
import GithubProviders from "next-auth/providers/github"
import { createUser, getUserByGithubId } from "../../services/service"

export const authOptions = {
    // pages: {
    //     signIn: '/auth/signin',
    //     signOut: '/auth/signout',
    //     error: '/auth/error', // Error code passed in query string as ?error=
    //     verifyRequest: '/auth/verify-request', // (used for check email message)
    //     newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    // },

    // 配置认证提供者，这里以示例为 Google 为例
    providers: [
        GoogleProviders({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
        GithubProviders({
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn(user, account, profile) {
            // 检查用户是否已存在于数据库中
            const existingUser = await getUserByGithubId(profile.id);

            // 如果用户不存在，则创建新用户
            if (!existingUser) {
                // 创建新用户
                await createUser({
                    name: profile.name,
                    email: profile.email,
                    avatar: profile.image,
                    githubId: profile.id,
                });
            }

            // 返回 true 允许用户登录，返回 false 将阻止用户登录
            return true;
        },
    },
}

const handler = NextAuth(authOptions as NextAuthConfig)
export { handler as GET, handler as POST }