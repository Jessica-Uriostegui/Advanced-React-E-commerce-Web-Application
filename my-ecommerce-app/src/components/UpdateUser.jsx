import { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateUser() {
    const [username, setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = JSON.parse(sessionStorage.getItem('user'));
            try{
                const response = await axios.get(`https://fakestoreapi.com/users/${user.id}`);
                setUsername(response.data.username);
                setEmail(response.data.email);
            }   catch (error) {
                setError('Failed to fetch user data');
            }
        };
        fetchUserData();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('user'));
        try {
            await axios.put(`https://fakestoreapi.com/users/${user.id}`, {
                username,
                email,
                password,
            });
            console.log('User updated successfully');
        }   catch (error) {
            setError('Failed to update user');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card" style={{ width: '24rem' }}>
                <div className="card-body">
                    <h5 className="card-title text-center">Update Profile</h5>
                    <form onSubmit={handleUpdate}>
                        <div clasName="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter new username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter new email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Update</button>
                        {error && <p classNAme="text-danger mt-2">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;