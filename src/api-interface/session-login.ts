import {post} from './http-client';
import {QUESTIONS_URL as EXAM_SESSION_URL} from './url-const'
export const loginToSession = async (sessionPayload: {name: string, password: string, sessionId: string}) => {
    const result = await post(`${EXAM_SESSION_URL}/session-login`, sessionPayload, {});
    return result;
}