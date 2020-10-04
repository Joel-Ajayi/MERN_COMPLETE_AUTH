

const DEFAULT_STATE={
    isAuth:false,
    error:''
}

export default function Auth(state=DEFAULT_STATE,action){
    switch(action.type) {
        case "isAuthentication":
        return {
            ...state,isAuth:action.isAuth,error:action.error
        };

        case "isAuthError":
        return {
            ...state,isAuth:action.isAuth,error:action.error
        }
        ;

        default:
            return state
    }
    
}