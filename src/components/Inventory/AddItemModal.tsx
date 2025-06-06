import { Modal, Button } from 'react-bootstrap';
import FormInput from '../../common/FormInput';

interface AddItemModalProps {
  show: boolean;
  onHide: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Item Name"
            type="text"
            value={formData.itemName}
            onChange={e => handleInputChange('itemName', e.target.value)}
            placeholder="Enter item name"
          />
          <FormInput
            label="Category"
            type="text"
            value={formData.category}
            onChange={e => handleInputChange('category', e.target.value)}
            placeholder="Enter category"
          />
          <FormInput
            label="ID / Serial #"
            type="text"
            value={formData.id}
            onChange={e => handleInputChange('id', e.target.value)}
            placeholder="Enter ID or Serial #"
          />
          <FormInput
            label="Location"
            type="text"
            value={formData.location}
            onChange={e => handleInputChange('location', e.target.value)}
            placeholder="Enter location"
          />
          <FormInput
            label="Purchase Date"
            type="date"
            value={formData.purchaseDate}
            onChange={e => handleInputChange('purchaseDate', e.target.value)}
          />
          <FormInput
            label="Vendor"
            type="text"
            value={formData.vendor}
            onChange={e => handleInputChange('vendor', e.target.value)}
            placeholder="Enter vendor name"
          />
          <FormInput
            label="Cost"
            type="number"
            value={formData.cost}
            onChange={e => handleInputChange('cost', e.target.value)}
            placeholder="Enter cost"
          />
          <FormInput
            label="Warranty Expiry"
            type="date"
            value={formData.warranty}
            onChange={e => handleInputChange('warranty', e.target.value)}
          />
          <FormInput
            label="Maintenance Schedule"
            type="text"
            value={formData.maintenanceSchedule}
            onChange={e => handleInputChange('maintenanceSchedule', e.target.value)}
            placeholder="e.g. Monthly, Quarterly"
          />
          <FormInput
            label="Last Serviced"
            type="date"
            value={formData.lastServiced}
            onChange={e => handleInputChange('lastServiced', e.target.value)}
          />
          <FormInput
            label="Next Due"
            type="date"
            value={formData.nextDue}
            onChange={e => handleInputChange('nextDue', e.target.value)}
          />
          <FormInput
            label="Service Provider"
            type="text"
            value={formData.serviceProvider}
            onChange={e => handleInputChange('serviceProvider', e.target.value)}
            placeholder="Enter provider name"
          />
          <FormInput
            label="Assigned To"
            type="text"
            value={formData.assignedTo}
            onChange={e => handleInputChange('assignedTo', e.target.value)}
            placeholder="Enter assignee"
          />
          <FormInput
            label="Status"
            type="text"
            value={formData.status}
            onChange={e => handleInputChange('status', e.target.value)}
            placeholder="Enter status"
          />
          <FormInput
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={e => handleInputChange('quantity', e.target.value)}
            placeholder="Enter quantity"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            /* handle save logic here */
          }}
        >
          Save Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddItemModal;
