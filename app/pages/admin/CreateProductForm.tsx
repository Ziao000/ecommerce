import { useState, useEffect } from "react";
import axios from "axios";

const CreateProductForm = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:8000/api/categories");
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleCreateProduct = async () => {
    const newProduct = {
      name: productName,
      description: productDescription,
      price: productPrice,
      category: { id: categoryId }
    };
    await axios.post("http://localhost:8000/api/products", newProduct);
    // Reset form fields after successful submission
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setCategoryId("");
  };

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="product-name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-description">Description</label>
          <textarea
            className="form-control"
            id="product-description"
            rows="3"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            className="form-control"
            id="product-price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="product-category">Catégorie</label>
          <select
            className="form-control"
            id="product-category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Selectionner une catégorie</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleCreateProduct}>
          Créer un nouveau produit
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
