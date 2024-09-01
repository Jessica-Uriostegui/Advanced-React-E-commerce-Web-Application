import { useState } from 'react';
import axios from 'axios';

function DeleteUser() {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const confirmDelete = window.confirm('Are you sure you want to delete your account?');
        if (confirmDelete) {
            try {
                await axios.delete(`https://fakestoreapi.com/users/${user.id}`);
                sessionStorage.removeItem('user');
                console.log('User deleted successfully');
            }   catch (error) {
                setError('Failed to delete user');
            }
        }
    };

    return (
        <div className="d-flex  justify-content-center align-items-center vh-100">
            <div className="card" style={{ width: '24rem' }}>
                <div className="card-bodyr">
                    <h5 className="card-title text-center">Delete Account</h5>
                    <button onClick={handleDelete} className="btn btn-danger btn-block">Delete Account</button>
                    {error && <p className="text-danger mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
}

export default DeleteUser;