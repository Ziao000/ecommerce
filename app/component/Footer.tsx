import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="footer bg-light mt-auto py-3">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">

            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.creativefabrica.com%2Ffr%2Fproduct%2Fgradient-e-commerce-logo-online-shop-14%2F&psig=AOvVaw0t2IghmjTu372GyArkd0_G&ust=1680953538719000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLCOh4fWl_4CFQAAAAAdAAAAABAb" alt="Placeholder logo" className="img-fluid" />
          </div>
          <div className="col-12 col-md-6">

            <p className="text-muted text-end">© 2023 My Shop. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
