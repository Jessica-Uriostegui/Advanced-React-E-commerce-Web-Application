import { createContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext({
    user: { name: '', email: '', isLoggedIn: false }, 
    setUser: () => {}, 
    login: () => {},
    logout: () => {},
    cart: [],
    setCart: () => {}, 
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : { name: '', email: '', isLoggedIn: false };
    });

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const login = (userData) => {
        setUser({ ...userData, isLoggedIn: true });
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    };

    const logout = () => {
        console.log('Logging out user');
        setUser({ name: '', email: '', isLoggedIn: false });
        setCart([]); 
        sessionStorage.removeItem('user');
        localStorage.removeItem('cart');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTotalQuantity');
        localStorage.removeItem('cartTotalPrice');
        window.location.reload();
    };

    const addToCart = (item) => {
        setCart((prevCart) => {
            const itemExist = prevCart.find(cartItem => cartItem.id === item.id);
            if (itemExist) {
                return prevCart.map(cartItem => 
                    cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1}];
            }
        });
       
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => {
            const item = prevCart.find(cartItem => cartItem.id === itemId);
            if (item.quantity > 1) {
                return prevCart.map(cartItem => 
                    cartItem.id === itemId
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
                );
            } else {
                return prevCart.filter(cartItem => cartItem.id !== itemId);
            }
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            login,
            logout,
            cart,
            setCart,
            addToCart,
            removeFromCart,
            clearCart,
        }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContext;

