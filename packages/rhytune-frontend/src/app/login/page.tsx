"use client";

import { useState } from 'react';
import { signIn, useSession, signOut, SessionProvider } from 'next-auth/react';
import { Button, Box } from "@chakra-ui/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { getUserByGithubId } from '../api/services/service'; // 导入 getUserByGithubId 函数

const LoginPage = () => {
    const sessionObj = useSession();
    const { data: session } = useSession();
    const [userInfo, setUserInfo] = useState(null);

    const handleGetUserByGithubId = async () => {
        try {
            const githubId = '5173244'; // 你的 GitHub 用户 ID
            const user = await getUserByGithubId(githubId);
            setUserInfo(user);
        } catch (error) {
            console.error('Error fetching user by GitHub ID:', error);
        }
    };

    return (
        <SessionProvider>
            <main className="justify-between p-24">
                <pre>session: {JSON.stringify(sessionObj, null, 2)}</pre>

                {session ? (
                    <div>
                        {/* 用户已登录，显示退出按钮 */}
                        <Button onClick={() => signOut()}>Logout</Button>
                    </div>
                ) : (
                    <div>
                        {/* 用户未登录，显示登录按钮 */}
                        <Button onClick={() => signIn('github')}>
                            <FaGithub /> Continue with GitHub
                        </Button>
                        <Button onClick={() => signIn('google')}>
                            <FaGoogle /> Continue with Google
                        </Button>
                    </div>
                )}

                {/* 增加测试按钮 */}
                <Button onClick={handleGetUserByGithubId}>
                    Test getUserByGithubId
                </Button>
                {/* 显示用户信息 */}
                {userInfo && (
                    <Box mt={4}>
                        <h2>User Info:</h2>
                        <p>Username: {userInfo.username}</p>
                        {/* 显示其他用户信息 */}
                    </Box>
                )}
            </main>
        </SessionProvider>
    );
}

export default function Login() {
    return (
        <SessionProvider>
            <LoginPage />
        </SessionProvider>
    );
}
