import { useDispatch } from "react-redux";
import { deleteTodo } from "../feature/todos/todosSlice";
import { Button, Modal } from "react-bootstrap";

export default function DeleteTodoModal({ show, handleClose, todoId }) {
  const dispatch = useDispatch();
  

  const handleDelete = () => {
    dispatch(deleteTodo({ id: todoId }));
    handleClose();
  }
  

  return (
    <Modal show={show} onHide={handleClose} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
