
// todo get the session cookie from useRequestHeaders('cookie') and fetch session from the db
// use cookie to get the session

import {db} from '../utils/db'

type User = {
    login: string;
    name: string;
    avatar_url: string;
}

const config = useRuntimeConfig()
const clientID = config.github.appConfig.oauth.clientId;
export default defineEventHandler(
    async (event): Promise<User|{login_link:string}> => {
    const user = db.get('github_user');
    console.log('server side user info!',user);
    if(user) {
        let {name,login,avatar_url} = user;
        return {
            name,
            login,
            avatar_url
        }
    }

    return {login_link:"https://github.com/login/oauth/authorize?client_id="+clientID};
})