import React, { useState } from 'react';
import { useInventoryStore } from '../../store/useInventoryStore';

const CategoryManagement: React.FC = () => {
  const categories = useInventoryStore(state => state.categories);
  const addCategory = useInventoryStore(state => state.addCategory);
  const removeCategory = useInventoryStore(state => state.removeCategory);
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="my-3">
      <h5>Manage Categories</h5>
      <div className="d-flex mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="New category"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
        />
        <button className="btn btn-primary ms-2" onClick={handleAdd}>
          Add
        </button>
      </div>
      <ul className="list-group">
        {categories.map(category => (
          <li
            key={category}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {category}
            <button className="btn btn-sm btn-danger" onClick={() => removeCategory(category)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
