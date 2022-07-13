import { useState } from "react";

const UseToken = () => {
    function getToken() {
        const tokenString = sessionStorage.getItem('token');
        console.log(tokenString);
        const userToken = JSON.parse(tokenString);
        return userToken?.token
      };
    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };
    return {
        setToken: saveToken,
        token
    }
}
 
export default UseToken;