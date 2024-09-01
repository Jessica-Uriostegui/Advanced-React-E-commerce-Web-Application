import { useContext } from 'react';
import {UserContext} from './UserContext';
import './home.css';


function Home() {
    const { user } = useContext(UserContext);
    
    return (
        <div className="home-background">
            {user.isLoggedIn && (
                <>
                    <h1>Welcome to Our Store {user.name}!</h1>
                    <p>Explore our wide range of products.</p>
                </>
            )}
            
        </div>
    );
}

export default Home;