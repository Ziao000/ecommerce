import React from 'react';
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";

type Category = {
  id: number;
  name: string;
};

type Props = {
  categories: Category[];
  cartItemCount: number;
};

const Header = ({ categories, cartItemCount }: Props) => {
  const categoryMenu = (
    <ul className="dropdown-menu">
      
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <p className="navbar-brand">My Shop</p>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item dropdown">
                <Link href="/globalCategory">
                    <p className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Categories
                    </p>
                </Link>
                {categoryMenu}
                </li>
            <li className="nav-item">
              <Link href="/cart">
                <p className="nav-link">
                  <i className="bi bi-cart-fill"></i>
                  Cart ({cartItemCount})
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
