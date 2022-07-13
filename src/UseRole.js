import { useState } from "react";
const UseRole = () => {
    function getRole() {
        const roleString = sessionStorage.getItem('role');
        console.log(roleString);
        const userRole = JSON.parse(roleString);
        return userRole?.role
      };
    const [role, setRole] = useState(getRole());

    const saveRole = (userRole) => {
        sessionStorage.setItem('role', JSON.stringify(userRole));
        setRole(userRole.role);
    };
    return {
        setRole: saveRole,
        role
    }
}
 
export default UseRole;