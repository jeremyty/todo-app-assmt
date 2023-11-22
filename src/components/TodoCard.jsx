import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import EditTodo from "../pages/EditTodo";
import DeleteTodoModal from "../pages/DeleteTodoModal";


export default function TodoCard({ todo }) {
  const completed = todo.completed;
  const border = completed ? "success" : "danger";
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [editTodoShow, setEditTodoShow] = useState(false);
  const [deleteTodoShow, setDeleteTodoShow] = useState(false);

  const handleClose = () => {
    setEditTodoShow(false);
    setDeleteTodoShow(false);
  };

  const handleDeleteTodoShow = () => {
    setDeleteTodoShow(true);
  };
  
  const handleEditTodoShow = () => {
    setEditTodoShow(true);
  };
  

  const startTimer = () => {
    if (timerInterval === null) {
      const intervalID = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setTimerInterval(intervalID);
      // to store intervalId
    }
  }

  const pauseTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
  }

  const resetTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setTimer(0);
  };



  useEffect(() => {
    return () => {
      clearInterval(timerInterval);
    };
  }, [timerInterval])


  return (
    <>
      <Card border={border} className="my-3">
      <Card.Header style={{ fontWeight: 'bold', fontSize: '20px', color: completed ? 'green' : 'red' }}>
  {!completed && 'Not'} Completed
</Card.Header>
        <Card.Body>
          <Card.Title>{todo.title}</Card.Title>
          <Card.Text>{todo.description}</Card.Text>
          <p> {timer} hours</p>
          <Button variant="outline-primary" onClick={startTimer}>
            <i className="bi bi-play"></i>
          </Button>
          <Button variant="outline-primary" onClick={pauseTimer} className="ms-2">
            <i className="bi bi-pause-fill"></i>
          </Button>
          <Button variant="outline-primary" onClick={resetTimer} className="ms-2">
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
         
          <Button variant="outline-dark" className="ms-2" onClick={handleEditTodoShow}>
            <i className="bi bi-pencil"></i>
          </Button>
          <Button variant="outline-danger" className="ms-2" onClick={handleDeleteTodoShow}>
            <i className="bi bi-trash3"></i>
          </Button>
        </Card.Body>
      </Card>
      
      <EditTodo show={editTodoShow} handleClose={handleClose} todoId={todo.id} />
      
      <DeleteTodoModal show={deleteTodoShow} handleClose={handleClose} todoId={todo.id} />
    </>
  )
}