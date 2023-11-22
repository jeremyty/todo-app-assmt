import { createContext, useState } from 'react'
import useLocalStorage from 'use-local-storage';
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import "bootstrap/dist/css/bootstrap.min.css";
import RequireAuth from "./components/RequireAuth"
import AddTodo from './pages/AddTodo';
import  Dashboard  from "./pages/Dashboard"
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import EditTodo from './pages/EditTodo';

export const AuthContext = createContext(null);
export const TodoContext = createContext(null);

function NavBar() {

  const navigate = useNavigate(); 

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const handleLogout = () => {
      localStorage.removeItem('denied');
        navigate("/", { replace: true });
    }

  const [searchResult, setSearchResult] = useState('');
  const handleSearch = () => {
    console.log('Search:', searchResult);
  };


  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" >
      <Container>
        <Navbar.Brand href="dashboard">Todo List</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link onClick={handleShow}>Add Todo</Nav.Link>
            <AddTodo show={show} handleClose={handleClose}/>
          </Nav>
        <Form className="d-flex ">
            <Form.Control
                type="search"
                placeholder="Search"
                className="mx-2"
                aria-label="Search"
                value={searchResult}
                onChange={(e) => setSearchResult(e.target.value)}
              />
              <Button variant="outline-success" onClick={handleSearch}>Search</Button>
            </Form>
          <Nav className="ms-4">
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
    <Outlet/>
    </>
    
  );
}

function App() {

  const [token, setToken] = useLocalStorage("token", null)
  const [todos, setTodos] = useLocalStorage("todos", [])

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ token, setToken }}>
        <TodoContext.Provider value={{ todos, setTodos }}>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route path="/" element={<NavBar />}>
              <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route path="add" element={<RequireAuth><AddTodo /></RequireAuth>} />
              <Route path="edit/:id" element={<EditTodo />} />
            </Route>
          </Routes>
        </TodoContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App
