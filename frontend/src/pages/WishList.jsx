import React, { useState, useEffect } from 'react';

const WishList = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        // Mock data matching the UI layout
        setWishlist([
            { id: 1, title: '1984', author: 'George Orwell', image: 'https://via.placeholder.com/150x220', price: 19.99 },
            { id: 2, title: 'Dune', author: 'Frank Herbert', image: 'https://via.placeholder.com/150x220', price: 19.99 },
            { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', image: 'https://via.placeholder.com/150x220', price: 19.99 },
        ]);
    }, []);

    const removeFromWishlist = (id) => {
        setWishlist(wishlist.filter(book => book.id !== id));
    };

    const addToCart = (book) => {
        console.log("Added to cart:", book.title);
        // Add your cart logic here
    };

    return (
        <div className="container-fluid py-4 ml-md-5" style={{ backgroundColor: '#F8F3EE', minHeight: '100vh' }}>
            <h2 className="mb-4 font-weight-bold" style={{ color: '#724E2C', fontFamily: 'serif' }}>My Wishlist</h2>

            {wishlist.length === 0 ? (
                <div className="text-center mt-5">
                    <p className="text-muted">Your wishlist is empty.</p>
                </div>
            ) : (
                <div className="row">
                    {wishlist.map(book => (
                        <div key={book.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            {/* Book Card Container */}
                            <div className="card h-100 border-0 shadow-sm text-center p-3"
                                style={{ borderRadius: '15px', backgroundColor: '#E8DED3' }}>

                                {/* Image Wrapper */}
                                <div className="bg-white p-2 mb-3 shadow-sm mx-auto" style={{ borderRadius: '10px', width: 'fit-content' }}>
                                    <img src={book.image} className="card-img-top img-fluid" alt={book.title}
                                        style={{ borderRadius: '5px', maxHeight: '200px' }} />
                                </div>

                                <div className="card-body d-flex flex-column p-0">
                                    <h5 className="card-title mb-1 font-weight-bold text-dark">{book.title}</h5>
                                    <p className="card-text text-muted small mb-3">{book.author}</p>
                                    <button
                                        onClick={() => addToCart(book)}
                                        className="btn btn-block mb-2 py-2 d-flex align-items-center justify-content-center"
                                        style={{ backgroundColor: '#FFFFFF', color: '#724E2C', borderRadius: '8px', border: '1px solid #D6C7B7' }}>
                                        <span className="mr-2">🛒</span> Add to Cart
                                    </button>

                                    <button
                                        onClick={() => removeFromWishlist(book.id)}
                                        className="btn btn-block py-2 d-flex align-items-center justify-content-center text-white"
                                        style={{ backgroundColor: '#B2967D', borderRadius: '8px' }}>
                                        <span className="mr-2">🗑️</span> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishList;