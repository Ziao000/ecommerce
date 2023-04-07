import React, { useState } from "react";
import axios from "axios";

const CreateCategoryForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/categories", {
        name,
        description,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="category-name">Nom de la catégorie</label>
        <input
          type="text"
          className="form-control"
          id="category-name"
          placeholder="Entrer le nom de la catégorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category-description">Description de la catégorie</label>
        <input
          type="text"
          className="form-control"
          id="category-description"
          placeholder="Entrer la description de la catégorie"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Créer
      </button>
    </form>
  );
};

export default CreateCategoryForm;
