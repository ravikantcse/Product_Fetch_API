// src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Product Listing</h1>
      <input
        type="text"
        placeholder="Search products"
        className="border p-2  mb-4 w-full text-center"
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="border p-4 cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.image} alt={product.title} className="h-48 w-full object-cover mb-4"/>
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.title}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.title} className="h-48 w-full object-cover mb-4"/>
            <p>{selectedProduct.description}</p>
            <p className="font-bold">${selectedProduct.price}</p>
            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-4 bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
