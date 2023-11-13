import { Usuario } from "../../interfaces/appInterfaces";



export interface AuthState {

    status: 'checking' | 'authenticated' | 'not-authenticated';
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
}


type AuthAction =    
    | { type: 'SIGN_UP' , payload: {token:string, user: Usuario} }
    | { type: 'SIGN_IN' , payload: {token:string, user: Usuario} }
    | { type: 'ADD_ERROR' , payload: string }
    | { type: 'REMOVE_ERROR' }
    | { type: 'NOT_AUTHENTICATED' }
    | { type: 'LOG_OUT' }


export const authReducer = (state:AuthState,action: AuthAction):AuthState => {



    switch (action.type) {
        case 'ADD_ERROR':
            return {
              ...state,
              user:null,
              errorMessage: action.payload,
              status: 'not-authenticated',
              token: null
            }
        case 'REMOVE_ERROR':
            return {
                ...state,
                errorMessage: '',
            }
    
        case 'SIGN_IN':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            }
        case 'SIGN_UP':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            }
        case 'LOG_OUT':
        case 'NOT_AUTHENTICATED':
            return {
                ...state,
                errorMessage: '',
                status: 'not-authenticated',
                token: null,
                user: null
            }
        
        default:
            return state;
    }
}
