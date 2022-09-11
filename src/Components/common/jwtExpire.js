export default (token) => {
    const parseJwt = (token) => {
        try {
            return JSON.parse(window.atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };
    
    const decodedJwt = parseJwt(token); 
    

    
    if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem('token')
    }
}