'use server';

import * as auth from '@/auth';

export const SignIn = async () => {
    return auth.signIn('github');
}