import { Col, Container, Row } from "react-bootstrap";
import TodoCard from "../components/TodoCard";
import { useSelector } from "react-redux";

function CardGroup({ todos }) {
  return todos.map((todo) => (
    <Col md={4} key={todo.id}>
      <TodoCard todo={todo} />
    </Col>
  ));
}

export default function Dashboard() {
  const todos = useSelector((state) => state.todos);

  return (
    <Container>
      <h1 className="my-3 text-center">My Todos</h1>
      <Row>
        {todos && todos.length > 0 ? (
          <CardGroup todos={todos} />
        ) : (
          <p style={{fontWeight: "bold", fontSize: "25px", color: "red"}}>No todos available.</p>
        )}
      </Row>
    </Container>
  );
}
