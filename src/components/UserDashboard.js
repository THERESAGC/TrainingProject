// // import React, { useState, useEffect } from 'react';
// // import { Navigate } from 'react-router-dom';
// // import axios from 'axios';
// // import Header from './Header'; // Import Header
// // import Sidebar from './Sidebar'; // Import Sidebar
// // import Footer from './Footer';   // Import Footer

// // const UserDashboard = () => {
// //   const [userData, setUserData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [products, setProducts] = useState([]);

// //   // Fetch user data and products after login
// //   useEffect(() => {
// //     const token = localStorage.getItem('authToken');
// //     if (token) {
// //       // Fetch user data
// //       const fetchUserData = async () => {
// //         try {
// //           const response = await axios.get('http://localhost:5000/api/users/me', {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           });
// //           setUserData(response.data); // Set the user data
// //           setLoading(false);
// //         } catch (error) {
// //           console.error('Error fetching user data:', error);
// //           setLoading(false);
// //         }
// //       };

// //       // Fetch products
// //       const fetchProducts = async () => {
// //         try {
// //           const productResponse = await axios.get('http://localhost:5000/api/products');
// //           setProducts(productResponse.data);
// //         } catch (error) {
// //           console.error('Error fetching products:', error);
// //         }
// //       };

// //       fetchUserData();
// //       fetchProducts();
// //     } else {
// //       setLoading(false);
// //     }
// //   }, []);

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (!localStorage.getItem('authToken')) {
// //     return <Navigate to="/user-login" />;
// //   }

// //   const handleLogout = () => {
// //     localStorage.removeItem('authToken');
// //     window.location.href = '/user-login'; // Redirect to the login page
// //   };

// //   return (
// //     <div>
// //       <Header />
// //       <div className="d-flex">
// //         <Sidebar />
// //         <div className="container mt-5" style={{ marginLeft: '250px' }}>
// //           {/* User info */}
// //           <div className="user-info mb-4">
// //             <h2>Welcome, {userData?.username}</h2>
// //             <p>Email: {userData?.email}</p>
// //             <button className="btn btn-danger" onClick={handleLogout}>
// //               Logout
// //             </button>
// //           </div>

// //           {/* Display Products */}
// //           <h3 className="mt-5">Available Products</h3>
// //           <div className="row">
// //             {products.length > 0 ? (
// //               products.map((product) => (
// //                 <div className="col-md-4" key={product._id}>
// //                   <div className="card mb-3">
// //                     <img
// //                       src={product.image || 'default-image.jpg'}
// //                       alt={product.name}
// //                       className="card-img-top"
// //                     />
// //                     <div className="card-body">
// //                       <h5 className="card-title">{product.name}</h5>
// //                       <p className="card-text">{product.description}</p>
// //                       <p className="card-text">
// //                         <strong>Price: </strong>${product.price}
// //                       </p>
// //                       <p className="card-text">
// //                         <strong>Quantity: </strong>{product.quantity}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <p>No products available at the moment.</p>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default UserDashboard;


// import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from './Header'; // Import Header
// import Footer from './Footer';   // Import Footer

// const UserDashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);

//   // Fetch user data and products after login
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       // Fetch user data
//       const fetchUserData = async () => {
//         try {
//           const response = await axios.get('http://localhost:5000/api/users/me', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setUserData(response.data); // Set the user data
//           setLoading(false);
//         } catch (error) {
//           console.error('Error fetching user data:', error);
//           setLoading(false);
//         }
//       };

//       // Fetch products
//       const fetchProducts = async () => {
//         try {
//           const productResponse = await axios.get('http://localhost:5000/api/products');
//           setProducts(productResponse.data);
//         } catch (error) {
//           console.error('Error fetching products:', error);
//         }
//       };

//       fetchUserData();
//       fetchProducts();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     window.location.href = '/user-login'; // Redirect to the login page
//   };

//   const handleAddToCart = (product) => {
//     setCart((prevCart) => {
//       const productInCart = prevCart.find((item) => item._id === product._id);
//       if (productInCart) {
//         return prevCart.map((item) =>
//           item._id === product._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const handleRemoveFromCart = (productId) => {
//     setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
//   };

//   const handleCheckout = () => {
//     if (cart.length === 0) {
//       alert('Your cart is empty');
//     } else {
//       // Handle checkout functionality
//       alert('Proceeding to checkout');
//       setCart([]); // Empty the cart after checkout
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!localStorage.getItem('authToken')) {
//     return <Navigate to="/user-login" />;
//   }

//   return (
//     <div>
//       <Header />
//       <div className="container mt-5">
//         {/* User info */}
//         <div className="user-info mb-4">
//           <h2>Welcome, {userData?.username}</h2>
//           <p>Email: {userData?.email}</p>
//           <button className="btn btn-danger" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>

//         {/* Display Products */}
//         <h3 className="mt-5">Available Products</h3>
//         <div className="row">
//           {products.length > 0 ? (
//             products.map((product) => (
//               <div className="col-md-4" key={product._id}>
//                 <div className="card mb-3">
//                   <img
//                     src={product.image || 'default-image.jpg'}
//                     alt={product.name}
//                     className="card-img-top"
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{product.name}</h5>
//                     <p className="card-text">{product.description}</p>
//                     <p className="card-text">
//                       <strong>Price: </strong>${product.price}
//                     </p>
//                     <p className="card-text">
//                       <strong>Quantity: </strong>{product.quantity}
//                     </p>
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => handleAddToCart(product)}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No products available at the moment.</p>
//           )}
//         </div>

//         {/* Display Cart */}
//         {cart.length > 0 && (
//           <div className="cart mt-5">
//             <h3>Your Cart</h3>
//             <div className="list-group">
//               {cart.map((item) => (
//                 <div className="list-group-item" key={item._id}>
//                   <div className="d-flex justify-content-between">
//                     <div>
//                       <strong>{item.name}</strong>
//                       <p>{item.description}</p>
//                       <p>Price: ${item.price}</p>
//                       <p>Quantity: {item.quantity}</p>
//                     </div>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleRemoveFromCart(item._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <button className="btn btn-success mt-3" onClick={handleCheckout}>
//               Checkout
//             </button>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default UserDashboard;
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'; // Import Header
import Footer from './Footer';   // Import Footer
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();

  // Fetch user data, categories, and products after login
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Fetch user data
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data); // Set the user data
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      };

      // Fetch categories
      const fetchCategories = async () => {
        try {
          const categoryResponse = await axios.get('http://localhost:5000/api/categories');
          setCategories(categoryResponse.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };

      // Fetch products
      const fetchProducts = async () => {
        try {
          const productResponse = await axios.get('http://localhost:5000/api/products');
          setProducts(productResponse.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchUserData();
      fetchCategories();
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/user-login'; // Redirect to the login page
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item._id === product._id);
      if (productInCart) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
    } else {
      // Handle checkout functionality
      // alert('Proceeding to checkout');
      navigate("/payment", { state: { cart } });
      setCart([]); // Empty the cart after checkout
    }
  };

  const toggleCategoriesDropdown = () => {
    setShowCategories(!showCategories);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!localStorage.getItem('authToken')) {
    return <Navigate to="/user-login" />;
  }

  return (
    <div>
      <Header />
      <div className="container mt-5">
        {/* User info */}
        <div className="user-info mb-4">
          <h2>Welcome, {userData?.username}</h2>
          <p>Email: {userData?.email}</p>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Categories Button and Dropdown */}
        <div className="mb-4">
          <button
            className="btn btn-secondary"
            onClick={toggleCategoriesDropdown}
          >
            Categories
          </button>
          {showCategories && (
            <div className="dropdown mt-2">
              <ul className="list-group">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li
                      key={category._id}
                      className="list-group-item"
                    >
                      {category.name}
                    </li>
                  ))
                ) : (
                  <p>No categories available.</p>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Display Products */}
        <h3 className="mt-5">Available Products</h3>
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <div className="card mb-3">
                  <img
                    src={product.image || 'default-image.jpg'}
                    alt={product.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      <strong>Price: </strong>${product.price}
                    </p>
                    <p className="card-text">
                      <strong>Quantity: </strong>{product.quantity}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available at the moment.</p>
          )}
        </div>

        {/* Display Cart */}
        {cart.length > 0 && (
          <div className="cart mt-5">
            <h3>Your Cart</h3>
            <div className="list-group">
              {cart.map((item) => (
                <div className="list-group-item" key={item._id}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.description}</p>
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-success mt-3" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

// UserDashboard.propTypes = {
//   addToCart: PropTypes.func.isRequired, // PropType for addToCart function
// };

export default UserDashboard;
