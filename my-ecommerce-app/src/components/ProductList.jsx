import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';
import { Modal, Form, Button } from 'react-bootstrap';
import './productList.css';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', body: ''});
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
            setFilteredProducts(response.data);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const filtered = products.filter(product => 
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedCategory === '' || product.category === selectedCategory)
        );
        setFilteredProducts(filtered);
    }, [searchQuery, selectedCategory, products]);

    const handleAddToCart = (product) => {
        dispatch(addItemToCart(product));
        setModalContent({
            title: 'Item Added',
            body:` ${product.title} - $${product.price} \n Has been added to your cart.`
        });
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };

    return (
        <div className="product-list">
            <div className="search-list">
                <Form.Group controlId="search">
                    <Form.Control
                        type="text"
                        placeholder="Search Products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mb-4"
                    />
                </Form.Group>
                <Form.Group controlId="category">
                    <Form.Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mb-6"
                    >
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="men's clothing">Mens Clothing</option>
                        <option value="women's clothing">Womens Clothing</option>
                        <option value="other">Other</option>
                    </Form.Select>
                </Form.Group>
            </div>
            {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.title} className="product-image" />
                    <h3>{product.title}</h3>
                    <p>Price: ${product.price}</p>
                    <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                </div>
            ))}
            
            <Modal show={showModal} onHide={() => setShowModal(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>{modalContent.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalContent.body}</Modal.Body>
            </Modal>
        </div>
    );
}

export default ProductList;