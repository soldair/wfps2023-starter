import {App, Octokit} from "octokit";
import {db} from '../utils/db';
import {saveSession} from '../utils/user';


export default defineEventHandler(
    async (event): Promise<string> => {
        const { github } = useRuntimeConfig();
        const app = new App(github.appConfig);
        const octokit = await app.getInstallationOctokit(github.installationId);
        const url = new URL(event.node.req.url||'','http://a');
        const githubCode = url.searchParams.get('code')||'';
        try{
            const {authentication} = await app.oauth.createToken({
                code: githubCode,
            });

            // you need ot make calls form an uthenticated octokit to make them on behalf of the user.
            const userOctokit = new Octokit({auth:authentication.token});
            const {data:user} = await userOctokit.rest.users.getAuthenticated();
            console.log('set!',user);
            db.set("github_auth",authentication);
            db.set("github_user",user);

            saveSession({github_auth:authentication,github_user:user});

            return "<script>close()</script>";
        } catch(e) {
            console.log("failed to authenticate user?!",e);
        }

        return "login failed.  <a href='/login'>please try again.</a>";
    },
);
