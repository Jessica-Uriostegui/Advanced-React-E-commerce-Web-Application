import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Button, Modal } from 'react-bootstrap';

function ProductDetail() {
  const { id } = useParams(); // Use useParams to get the route parameter
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useContext(UserContext); // Access addToCart from UserContext

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching the product data:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Add product to the cart
      setShowModal(true);
      setTimeout(() => setShowModal(false), 500); // Hide notification after 3 seconds
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}2</p>
      <img src={product.image} alt={product.title} />
      <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Item Added</Modal.Title>
        </Modal.Header>
      </Modal>
    </div>
  );
}

export default ProductDetail;


