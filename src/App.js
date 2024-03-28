import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import ItemList from './Components/ItemList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartItem from './Components/CartItem';
import OrderDetails from './Components/OrderDetails';
import FullMealDetails from './Components/FullMealDetails';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/items/:category' element={<ItemList></ItemList>}></Route>
          <Route path='/cart' element={<CartItem></CartItem>}></Route>
          <Route path='/order' element={<OrderDetails></OrderDetails>}></Route>
          <Route path='/:idMeal' element={<FullMealDetails></FullMealDetails>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
