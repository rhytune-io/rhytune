'use client';

import { signIn, useSession, signOut, SessionProvider } from 'next-auth/react';
import { Button } from "@chakra-ui/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
// import { authOptions } from "pages/api/auth/[...nextauth]/route"


const LoginPage = () => {

    const sessionObj = useSession();
    const { data: session } = useSession();

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
