import { useEffect, useState } from 'react';
import {BehaviorSubject} from 'rxjs';

const currentloggedInUser = new BehaviorSubject<{loggedInUser: string, role: 'admin' | 'candidate'} | undefined>(undefined);

export const useLoggedInUser = () => {
    const [loggedIn, setLoggedIn] = useState<{ loggedInUser: string, role: 'admin' | 'candidate' } | undefined>(currentloggedInUser.value);
    useEffect(() => {
        const subscriptionId = currentloggedInUser.subscribe((loggedInUser) => {
            setLoggedIn(loggedInUser);
        });
        return () => subscriptionId.unsubscribe();

    });
    return loggedIn;
}

export const setLoggedInUser = (loggedInUser : {loggedInUser: string, role: 'admin' | 'candidate'}) => {
    currentloggedInUser.next(loggedInUser);
}