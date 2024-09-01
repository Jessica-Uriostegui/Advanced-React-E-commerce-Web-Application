import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import './checkout.css';

function Checkout() {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    const handleCheckout = () => {
        dispatch(clearCart());
        localStorage.removeItem('cart');
        setCheckoutSuccess(true);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div>
            <h2>Checkout</h2>
            {checkoutSuccess && <Alert variant="success">Checkout successful! Your cart has been cleared.</Alert>}
            {cart.length > 0 ? (
                <div>
                    <h3>Total: ${calculateTotal().toFixed(2)}</h3>
                    <Button variant="primary" onClick={handleCheckout}>
                        Complete Checkout
                    </Button>
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
}

export default Checkout;