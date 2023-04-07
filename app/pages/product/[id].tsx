import React, { useState } from 'react';
import axios from 'axios';
import Header from '@/component/header';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
}

interface ProductProps {
  product: Product;
  categories: Category[];
}

export default function ProductPage({ product, categories }: ProductProps) {
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  const handleAddToCart = (productId: number) => {
    setCartItemCount(cartItemCount + 1);
  };

  return (
    <div className="container">
      <Header categories={categories} cartItemCount={cartItemCount} />
      <div className="row">
        <div className="col-md-6">
          <img src="https://via.placeholder.com/300x300.png?text=Product+Image" alt={product.name} className="img-fluid mb-3" />
        </div>
        <div className="col-md-6">
          <h1 className="mb-3">{product.name}</h1>
          <p className="lead mb-3">{product.description}</p>
          <h3 className="mb-3">{product.price} €</h3>
          <button className="btn btn-primary" onClick={() => handleAddToCart(product.id)}>Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const response = await axios.get('http://localhost:8000/api/products');
  const products = response.data;
  const paths = products.map((product: Product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const productId = params.id;
  const productResponse = await axios.get(`http://localhost:8000/api/products/${productId}`);
  const product = productResponse.data;
  const categoriesResponse = await axios.get('http://localhost:8000/api/categories');
  const categories = categoriesResponse.data;
  return { props: { product, categories } };
}


