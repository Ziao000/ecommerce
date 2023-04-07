import React, { useState } from 'react';
import axios from 'axios';
import Header from '@/component/header';
import Footer from '@/component/footer';
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";

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

interface CategoryProps {
  products: Product[];
  category: Category;
}

export default function CategoryPage({ products, category }: CategoryProps) {
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  const handleAddToCart = async (productId: number) => {
    try {
      const orderResponse = await axios.post('http://localhost:8000/api/orders', {
        status: 'Pending',
        amount: 0,
        user: {
          id: 1
        },
        orderItems: [
          {
            quantity: 1,
            product: {
              id: productId
            }
          }
        ]
      });
      setCartItemCount(orderResponse.data.cartItemCount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Header cartItemCount={cartItemCount} />
      <h1>{category.name}</h1>
      <div className="row row-cols-1 row-cols-md-3">
        {products.map((product) => (
          <div key={product.id} className="col mb-4">
            <div className="card h-100">
              <Link href={`/product/${product.id}`}> 
                  <img src="https://via.placeholder.com/300x200" className="card-img-top" alt={product.name} />
              </Link>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="card-text">{product.description}</p>
                <p className="card-text">{product.price} €</p>
                <button className="btn btn-primary" onClick={() => handleAddToCart(product.id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const categoriesResponse = await axios.get('http://localhost:8000/api/categories');
  const categories = categoriesResponse.data;

  const paths = categories.map((category) => ({
    params: { id: category.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const categoryId = params.id;
  const productsResponse = await axios.get(`http://localhost:8000/api/products?categoryId=${categoryId}`);
  const products = productsResponse.data;
  const categoryResponse = await axios.get(`http://localhost:8000/api/categories/${categoryId}`);
  const category = categoryResponse.data;

  return { props: { products, category } };
}
  