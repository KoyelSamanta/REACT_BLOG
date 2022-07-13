import { useState } from "react";
const UseName = () => {
        function getName() {
            const nameString = sessionStorage.getItem('name');
            console.log(nameString);
            const userName = JSON.parse(nameString);
            return userName?.name
          };
        const [name, setName] = useState(getName());
    
        const saveName = (userName) => {
            sessionStorage.setItem('name', JSON.stringify(userName));
            setName(userName.name);
        };
        return {
            setName: saveName,
            name
        }
}
 
export default UseName;