import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import VListRow from './VListRow';

const VolunteerList = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const { user, logOut } = useContext(AuthContext);

    useEffect(() => {
        fetch(`https://helping-hand-server.vercel.app/volunteer?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('volunteer-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOut();
                }
                return res.json()
            })
            .then(data => {
                setVolunteers(data);
            })
    }, [refresh, user?.email, logOut])

    const handleDelete = id => {
        fetch(`https://helping-hand-server.vercel.app/volunteer/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('volunteer-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setRefresh(!refresh);
                    alert('Deleted successfully.')
                }
            })
    }
    return (
        <div>
            <h2 className='text-center text-4xl my-10'>Volunteer List</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Registering Date</th>
                            <th>Event Name</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            volunteers.map(volunteer => <VListRow
                                key={volunteer._id}
                                volunteer={volunteer}
                                handleDelete={handleDelete}
                            ></VListRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VolunteerList;