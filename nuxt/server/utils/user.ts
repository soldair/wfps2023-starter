import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import {db} from './db';

const tmp = os.tmpdir()
const sessionFile = path.join(tmp,'wfps-nuxt-user-session')

export function saveSession(data:any){
    fs.writeFileSync(sessionFile,JSON.stringify(data));
}

export function deleteSession(){
    try{
        fs.unlinkSync(sessionFile);
    } catch(e){
        return false;
    }
}

export function readSession(){
    try{
        return JSON.parse(fs.readFileSync(sessionFile)+'');
    } catch(e){
        return false;
    }
}

const initSession = readSession();
if(initSession){
    db.set('github_user',initSession.github_user);
    db.set('github_auth',initSession.github_auth);
}