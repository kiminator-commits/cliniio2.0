import { Modal, Button } from 'react-bootstrap';

interface NewAddItemModalProps {
  show: boolean;
  onHide: () => void;
}

const NewAddItemModal: React.FC<NewAddItemModalProps> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>{/* Your form fields go here */}</Modal.Body>
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

export default NewAddItemModal;
