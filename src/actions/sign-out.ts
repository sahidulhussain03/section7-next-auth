'use server';

import * as auth from '@/auth';

export const SignOut = async () => {
    return auth.signOut();
}