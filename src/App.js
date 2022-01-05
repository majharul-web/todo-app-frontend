
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddToDo from './Pages/Home/AddToDo/AddToDo';
import ShowToDo from './Pages/Home/ShowToDo/ShowToDo';
import Home from './Pages/Home/Home/Home';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<ShowToDo />}></Route>
            <Route path='addToDo' element={<AddToDo />}></Route>
            <Route path='showTodo' element={<ShowToDo />}></Route>
          </Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
