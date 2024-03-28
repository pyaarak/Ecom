import React from 'react'
import '../StyleSheets/Navbar.scss'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const CartItems = useSelector((state) => state.CartItems.Cartdata)
  return (
    <div className='nav_wrapper'>
      <div className='nav_inner'>
        <div>
          <a href='/'>Logo</a>
        </div>
        <div className='right_menu'><a className='cart-item' href='/cart'><ShoppingCartIcon></ShoppingCartIcon><p>{CartItems ? Object.keys(CartItems).length : 0}</p></a><a href='/order'>Orders</a></div>
      </div>
    </div>
  )
}
