import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createTodo } from "../feature/todos/todosSlice";

export default function AddTodo({ show, handleClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createTodo({ title, description, completed }));
    setTitle("");
    setDescription("");
    setCompleted(false);
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose} size="md">
      <Modal.Header>
        <Modal.Title>Add Todo</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              rows={3}
              required
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            id="completed"
            label="Mark as completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mb-3"
          />
          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
