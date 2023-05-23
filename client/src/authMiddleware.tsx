import { handleAuthenticated } from "./api/apiAuth";



const authMiddleware = async (path?: string) => {
    
    const validate = await handleAuthenticated();
    if(!validate){
        if(path) location.assign(path);
        return {
            error: 'Unauthenticated'
        };
    }
    else {
        return validate.decode;
    }
};

export default authMiddleware;