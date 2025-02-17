//Theresa 

import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const { state } = useLocation();  // Extract cart from the navigation state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invoicePath, setInvoicePath] = useState(null);

  const cart = state?.cart || []; // Ensure cart is an empty array if not available

  // Handle payment and invoice generation
  const handlePayment = async () => {
    if (cart.length === 0) {
      setError("Your cart is empty, please add items before proceeding.");
      setLoading(false);
      return;
    }
  
    // Log cart data to the console before sending the request
    console.log("Sending cart data to backend:", cart);
  
    try {
      const response = await axios.post("http://localhost:5000/api/invoice/create-invoice", {
        cartData: cart, // Sending cart data
      });
      console.log("Invoice generated:", response.data);
  
      setInvoicePath(response.data.invoicePath);
      setLoading(false);
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("There was an error processing your payment. Please try again.");
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (cart.length > 0) {
      // Call the handlePayment function once the cart has items
      setTimeout(() => {
        handlePayment();
      }, 2000); // 2 seconds delay, can be adjusted as needed
    }
  }, [cart]);

  useEffect(() => {
    if (invoicePath) {
      // Navigate to the InvoicePage after the invoice is created
      navigate(`/invoice/${invoicePath}`);
    }
  }, [invoicePath, navigate]);

  return (
    <div className="container">
      <h2>Processing Payment...</h2>
      <p>Please wait while we process your order.</p>

      {loading && <p>Processing your payment. Please wait...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

// Prop validation (optional if you decide to pass cart as a prop in the future)
PaymentProcessing.propTypes = {
  cart: PropTypes.array, // PropType for cart (optional here, since you're using useLocation)
};

export default PaymentProcessing;
