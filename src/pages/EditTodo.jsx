import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editTodo } from "../feature/todos/todosSlice";

export default function EditTodo({ show, handleClose, todoId }) {
  
  const dispatch = useDispatch();

  const todo = useSelector((state) => {
    return state.todos.find((todo) => todo.id === todoId);
  });
  

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);


  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setCompleted(todo.completed)
    }
  }, [todo]);

  function handleSubmit(e) {
    e.preventDefault();
    if (todo) {
      // Dispatch an action to update the todo
      dispatch(
        editTodo({
          id: todoId,
          title,
          description,
          completed,
        })
      );
      setTitle("");
      setDescription("");
      setCompleted(false);
      handleClose();
    }
  }

  return (
    <Modal show={show} onHide={handleClose} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo</Modal.Title>
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
            Update
          </Button>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
