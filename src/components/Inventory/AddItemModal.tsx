import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { inventoryItemSchema } from '../../validation/inventoryValidation';
import { InventoryItem } from '../../types/inventory';
import { ValidationError } from 'yup';
import { useInventoryStore } from '../../store/inventoryStore';

interface AddItemModalProps {
  show: boolean;
  onHide: () => void;
  onAddItem: (item: InventoryItem) => void;
}

interface AddItemFormState {
  name: string;
  category: string;
  quantity: number;
  location: string;
}

interface FormErrors {
  name?: string;
  category?: string;
  quantity?: string;
  location?: string;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ show, onHide, onAddItem }) => {
  const addInventoryItem = useInventoryStore(state => state.addInventoryItem);
  const inventoryItems = useInventoryStore(state => state.inventoryItems);
  const [formData, setFormData] = useState<AddItemFormState>({
    name: '',
    category: '',
    quantity: 0,
    location: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await inventoryItemSchema.validate(formData, { abortEarly: false });
      // If validation passes, proceed with form submission
      const generatedUniqueId = Date.now().toString();
      
      const existingItem = inventoryItems.find(item => item.id === generatedUniqueId);
      if (existingItem) {
        // Handle duplicate (for now, simply log to console and skip insertion)
        console.warn('Duplicate ID detected, skipping add.');
        return;
      }

      const newItem = {
        id: generatedUniqueId,
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addInventoryItem(newItem);
      onAddItem(newItem);
      
      // Reset form state to initial values
      setFormData({
        name: '',
        category: '',
        quantity: 0,
        location: '',
      });
      setErrors({});
      
      onHide();
    } catch (err) {
      if (err instanceof ValidationError) {
        const validationErrors: FormErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path as keyof FormErrors] = error.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              isInvalid={!!errors.category}
            >
              <option value="">Select category</option>
              <option value="tools">Tools</option>
              <option value="supplies">Supplies</option>
              <option value="equipment">Equipment</option>
              <option value="officeHardware">Office Hardware</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              isInvalid={!!errors.quantity}
            />
            <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              isInvalid={!!errors.location}
            />
            <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Item
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddItemModal;
