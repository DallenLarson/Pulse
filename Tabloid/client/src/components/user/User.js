import { useState } from "react";
import { Link } from "react-router-dom";
import { updateUserProfile } from "../../modules/userProfileManager";


const User = ({ user, getUsers }) => {
    const [displayDeactivateButton, setDisplayDeactivateButton] = useState(true)

    const handleDeactivate = (event) => {
        event.preventDefault();
        user.activated = false;
        updateUserProfile(user);
        setDisplayDeactivateButton(true);
        getUsers();
    }

    const handleReactivate = (event) => {
        event.preventDefault();
        user.activated = true;
        updateUserProfile(user);
        getUsers();
    }

    if (user.activated) {
        return <tr>
            <td><Link to={`${user.id}`}>{user.displayName}</Link></td>
            <td>{user.fullName}</td>
            <td>{user.userType.name}</td>
            <td>{displayDeactivateButton ? <button onClick={() => { setDisplayDeactivateButton(false) }}>Deactivate</button>
                : <>Are you sure?<button onClick={handleDeactivate}>Yes</button>
                    <button onClick={() => { setDisplayDeactivateButton(true) }}>No</button></>}</td>
        </tr>
    } else {
        return <tr>
            <td><Link to={`${user.id}`}>{user.displayName}</Link></td>
            <td>{user.fullName}</td>
            <td>{user.userType.name}</td>
            <td><button onClick={handleReactivate}>Reactivate</button></td>
        </tr>
    }

}

export default User;