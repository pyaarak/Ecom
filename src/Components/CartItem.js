import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../StyleSheets/CartItem.scss'
import { useNavigate, useParams } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { emptyFromCart, removeFromCart, setAddOrders, setAddtoCart } from '../Redux/Slice';

export default function CartItem() {
    const params = useParams()
    const CategoriesItems = useSelector((state) => state.CategoriesItems)
    const CartDetails = useSelector((state) => state.CartItems.CartDetails)
    const CartItems = useSelector((state) => state.CartItems.Cartdata)
    const OrderItems = useSelector((state) => state.OrderItems.Orderdata)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddtoCart = (meal) => {
        dispatch(setAddtoCart(meal))
    }

    const handleRemovetoCart = (meal) => {
        dispatch(removeFromCart(meal))
    }

    const handlePlaceOrder = () => {
        let orderDetails = {}
        orderDetails.OrderId = Object.keys(OrderItems).length + 1
        let Details = []
        Object.keys(CartDetails).map((ele) => {
            Details.push({ ...CartDetails[ele], noOfItems: CartItems[ele], TotalPrice: CartItems[ele] * CartDetails[ele].price })
        })
        orderDetails.Orders = Details
        orderDetails.Totalvalue = Totalval
        dispatch(setAddOrders(orderDetails))
        dispatch(emptyFromCart())
        console.log(orderDetails)
    }

    const Totalval = useMemo(() => {
        if (CartItems && Object.keys(CartItems).length > 0) {
            let sum = 0
            Object.keys(CartDetails).map((ele) => {
                sum = sum + (CartItems[ele] * Number(CartDetails[ele].price))
            })
            return sum
        }
    }, [CartItems])

    return (
        <div className='item-wrapper'>
            <div className='item-inner-wrapper'>
                <p className='back_button'><ArrowBackIcon onClick={e => { navigate('/') }}></ArrowBackIcon></p>
                <p className='Header'>Cart {CartItems ? Object.keys(CartItems).length : 0} items</p>
                <div className='row'>
                    <div className='col-lg-8'>
                        {CartDetails && Object.keys(CartDetails).length > 0 && Object.keys(CartDetails).map((ele) => {
                            return (
                                <div className='item-details' key={CartDetails[ele].idMeal} onClick={e => { navigate(`/${CartDetails[ele].idMeal}`) }}>
                                    <div className='card cart_item'>
                                        <img class="card-img-left" src={CartDetails[ele].strMealThumb} alt="Card image cap" />
                                        <div class="card-body">
                                            <p class="card-text">{CartDetails[ele].strMeal}</p>
                                            <p class="card-text">₹ {CartDetails[ele].price} /-</p>
                                        </div>
                                        <div class="card-footer">
                                            <p class="card-text"><div className='footerbutton'><button onClick={e => { e.stopPropagation(); handleAddtoCart(CartDetails[ele]) }}>+</button><p>{CartItems[ele]}</p><button onClick={e => { e.stopPropagation(); handleRemovetoCart(CartDetails[ele]) }}>-</button></div></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                    {CartDetails && Object.keys(CartDetails).length > 0 &&
                        <div className='col-lg-4'>
                            <div className='card'>
                                <p className='Header'>Summary</p>
                                {CartDetails && Object.keys(CartDetails).length > 0 && Object.keys(CartDetails).map((ele) => {
                                    return (
                                        <div className='summary-deatils' key={ele}>
                                            <div class="card-body">
                                                <p class="card-text">{CartDetails[ele].strMeal}</p>
                                            </div>
                                            <div class="card-footer">
                                                <p class="card-text">{<p>{CartItems[ele]} x {CartDetails[ele].price} = {CartItems[ele] * CartDetails[ele].price}</p>}</p>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                                <div className='summary-deatils'>
                                    <div class="card-body">
                                        <p class="card-text"></p>
                                    </div>
                                    <div class="card-footer">
                                        <p class="card-text">{<p>Total = {Totalval}</p>}</p>
                                    </div>
                                </div>
                            </div>
                            <button className='order_button' onClick={e => { handlePlaceOrder() }}>Place Order</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
