
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Badge } from 'react-bootstrap';
import { addItemToCart, removeItemFromCart, deleteItemFromCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import './cart.css';

function Cart() {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const increaseQuantity = (item) => {
        dispatch(addItemToCart(item));
    };

    const decreaseQuantity = (item) => {
        dispatch(removeItemFromCart(item.id));
    };

    const deleteItem = (itemId) => {
        dispatch(deleteItemFromCart(itemId));
    }

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleNavigateToCheckout = () => {
        navigate('/checkout');
    };

    const { user } = useContext(UserContext);

    return (
        <div className="shopping-cart">
            <h2>Your Shopping Cart</h2>
            {cart.length > 0 ? (
                <div className="cart-items">
                {cart.map((item) => (
                    <Card key={item.id} className="cart-item-card mb-2">
                        <Card.Img variant="top" src={item.image} className="item-image" />
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                Price: ${item.price}
                                <br />
                                Quantity: {item.quantity}
                                
                            </Card.Text>
                            <div className="d-flex justify-content-between">
                                <Button variant="secondary" size="sm" onClick={() => decreaseQuantity(item)}>-</Button>
                                <Badge bg="info" className="quantity-badge">{item.quantity}</Badge>
                                <Button variant="secondary" size="sm" onClick={() => increaseQuantity(item)}>+</Button>
                                <Button variant="danger" size="sm" onClick={() => deleteItem(item.id)}>Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>

                ))}
            </div>
        ) : (
                <p>Your cart is empty</p>
            )}
            <br />
            <div className="text-center">
                <h3>Total: ${calculateTotal().toFixed(2)}</h3>
                {user.isLoggedIn ? (
                    <Button variant="primary" onClick={handleNavigateToCheckout} disabled={cart.length === 0}>
                        Proceed to Checkout
                    </Button>
                ) : (
                    <p>Please log in or register to proceed to checkout.</p>
                )}
            </div>
        </div>
    );
}
export default Cart;