
export async function useUser(): Promise<unknown> {
    const {data: user} = useFetch<{login:string,name:string,avatar_url:string}|{login_link:string}>('/api/user');
    console.log('api response>> ',user);
    return user;
}