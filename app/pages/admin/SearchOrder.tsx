import React, { useState } from 'react';
import axios from 'axios';
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

interface HomeProps {
  products: Product[];
  categories: Category[];
}

const PanelPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/orders?status=Pending');
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container my-4">
        <h2>Commandes en cours</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Montant</th>
              <th scope="col">Statut</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id}>
                <th scope="row">{order.id}</th>
                <td>{order.createdAt}</td>
                <td>{order.amount} €</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={getOrders}>Actualiser</button>
      </div>
    </>
  );
};

export default PanelPage;
