// api/service.ts

const apiUrl: string = process.env.NEXT_PUBLIC_API_URL || '';

interface FetchOptions extends RequestInit {
    // 可以根据需要定义其他属性
}

async function fetchData<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    try {
        const response = await fetch(`${apiUrl}/${endpoint}`, options);
        const data: T = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
    }
}

export async function getUsers(): Promise<User[]> {
    return await fetchData<User[]>('users');
}

export async function getUserById(userId: string): Promise<User> {
    return await fetchData<User>(`users/${userId}`);
}

export async function getUserByGithubId(githubId: string): Promise<User> {
    return await fetchData<User>(`users/github/${githubId}`);
}

// 其他 API 请求函数...

interface User {
    // 根据后端返回的用户数据定义接口
}
