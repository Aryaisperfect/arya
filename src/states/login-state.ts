import { useEffect, useState } from 'react';
import {BehaviorSubject} from 'rxjs';

interface Session {
    name: string,
    sessionId: string,
    category: string,
    numberOfQuestions: number,
    sessionStarted?: Date,
    questions?: unknown[]
    
}
const currentSession = new BehaviorSubject<Session | undefined>(undefined);

export const useSession = () => {
    const [session, setSession] = useState<Session | undefined>(currentSession.value);
    useEffect(() => {
        const subscriptionId = currentSession.subscribe((session) => {
            setSession(session);
        });
        return () => subscriptionId.unsubscribe();

    });
    return session;
}

export const setSession = (session :Session) => {
    currentSession.next(session);
}