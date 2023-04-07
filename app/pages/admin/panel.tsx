import React from "react";
import Header from '@/component/header';
import CreateProductForm from "./CreateProductForm";
import CreateCategoryForm from "./CreateCategoryForm";
import SearchOrder from "./SearchOrder";

const PanelPage = () => {
  return (
    <>
      <Header />
      
      <div className="container my-4">
        <h2>Créer un nouveau produit</h2>
        <CreateProductForm />
      </div>
      <div className="container my-4">
        <h2>Créer une nouvelle catégorie</h2>
        <CreateCategoryForm />
      </div>

      <SearchOrder />

      
    </>
  );
};

export default PanelPage;
