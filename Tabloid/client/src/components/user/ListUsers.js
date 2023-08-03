import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { getAllUserProfiles } from "../../modules/userProfileManager";
import User from "./User";


const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [showDeactivated, setShowDeactivated] = useState(false);

    const getUsers = () => {
        getAllUserProfiles()
            .then(usersData => {
                setUsers(usersData)
            })
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Display Name</th>
                        <th>Name</th>
                        <th>User Type</th>
                        <th>{
                            showDeactivated ? <button onClick={() => { setShowDeactivated(false) }}>View Activated</button>
                                : <button onClick={() => { setShowDeactivated(true) }}>View Deactivated</button>
                        }</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => {
                            if (!showDeactivated === user.activated) {
                                return <User key={user.id} user={user} getUsers={getUsers} />
                            }
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default ListUsers;