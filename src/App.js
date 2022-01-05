
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddToDo from './Pages/Home/AddToDo/AddToDo';
import ShowToDo from './Pages/Home/ShowToDo/ShowToDo';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Login/Login/Login/Login';
import Register from './Pages/Login/Login/Register/Register';
import useAuth from './hooks/useAuth';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';

function App() {
  const { user } = useAuth();
  return (
    <div>

      <Router>
        <Routes>
          <Route path='/' element={<Home />}>
            {
              user.email ?
                <Route index element={<ShowToDo />}></Route>
                :
                <Route index element={<Login />}></Route>
            }
            <Route path='login' element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='addToDo' element={<PrivateRoute><AddToDo /></PrivateRoute>}></Route>
            <Route path='showTodo' element={<PrivateRoute><ShowToDo /></PrivateRoute>}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
