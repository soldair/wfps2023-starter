import {db} from '../utils/db';
import {deleteSession} from '../utils/user';

export default defineEventHandler(
    async (event): Promise<string> => {
    db.delete("github_auth");
    db.delete("github_user");
    deleteSession();
    sendRedirect(event,'/');
    return "success";
})