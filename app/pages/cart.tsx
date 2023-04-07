import React, { useEffect, useState } from 'react';
import Header from '@/component/header';
import Footer from '@/component/footer';

interface Order {
  id: number;
  status: string;
  amount: number;
  items: {
    id: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      description: string;
      price: number;
    };
  }[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/orders')
      .then(response => response.json())
      .then(data => setOrders(data));
  }, []);

  const getTotalPrice = (items: Order['items']) => {
    return items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await fetch(`http://localhost:8000/api/orders/${orderId}`, {
        method: 'DELETE',
      });
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <Header />
      <h1>Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <h3>{order.status}</h3>
            <p>Total price: ${getTotalPrice(order.items)}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>
                  {item.product.name} - {item.product.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <button onClick={() => handleDeleteOrder(order.id)}>Delete Order</button>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default Orders;
