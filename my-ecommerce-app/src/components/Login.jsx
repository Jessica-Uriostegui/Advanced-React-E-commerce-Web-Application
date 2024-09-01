import { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function Login() {
    const { login } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
   

   const handleLogin = (e) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'password') {
        const userData = {name: username, email: 'admin@example.com' };
        login(userData);
        navigate('/home');
    } else {
        setError('Invalid username or password');
    }
};

return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: '24rem' }}>
            <div className="card-body">
                <h5 className="card-title text-center">Login</h5>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                    {error && <p className="text-danger mt-2">{error}</p>}
                </form>
            </div>
        </div>
    </div>
   );
}

export default Login;