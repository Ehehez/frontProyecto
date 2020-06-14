import { User } from '../../models/user';
import { AuthActionTypes, All } from './auth.actions';



export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
    // error message
    errorMessage: string | null;

    cookies: Boolean;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
    cookies: false
};

export function reducer(state = initialState, action: All): State {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    token: action.payload.token,
                    email: action.payload.email,
                    follows: action.payload.follows,

                },
                errorMessage: null
            };
        };
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                errorMessage: 'Incorrect email and/or password.'
            };
        }
        case AuthActionTypes.SIGNUP_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    token: action.payload.token,
                    email: action.payload.email
                },
                errorMessage: null
            };
        }
        case AuthActionTypes.SIGNUP_FAILURE: {
            return {
                ...state,
                errorMessage: 'That email/username is already in use.'
            };
        }
        case AuthActionTypes.LOGOUT: {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                errorMessage: null,
                cookies: false,
            };

        }
        case AuthActionTypes.FOLLOWS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    follows: action.payload.follows,
                }
            }
        }
        case AuthActionTypes.COOKIES: {
            return {
                ...state,
                cookies: action.payload.cookies,
            }
        }
        default:
            return { ...state };
    }
}