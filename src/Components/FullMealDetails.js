import React, { useEffect } from 'react'
import '../StyleSheets/FullMealDetails.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchFullDetails } from '../Redux/Api'
import { removeFromCart, setAddtoCart } from '../Redux/Slice';


export default function FullMealDetails() {
    const FullDetails = useSelector((state) => state.FullDetails.data)
    const CartDetails = useSelector((state) => state.CartItems.CartDetails)
    const CartItems = useSelector((state) => state.CartItems.Cartdata)
    const params = useParams();
    const dispatch = useDispatch();

    const handleAddtoCart = (meal, price) => {
        let fullMeal = { ...meal, price: price }
        dispatch(setAddtoCart(fullMeal))
    }

    const handleRemovetoCart = (meal) => {
        dispatch(removeFromCart(meal))
    }

    useEffect(() => {
        dispatch(fetchFullDetails(params.idMeal))
    }, [])
    return (
        <div className='full-meal-details'>
            <div className='full-inner-details'>
                {FullDetails && FullDetails.meals && FullDetails.meals[0] &&
                    <div className='row card-det'>
                        <div className='col-md-6 det-img'>
                            <img src={FullDetails.meals[0].strMealThumb}></img>
                        </div>
                        <div className='col-md-6 det-details'>
                            <p>{FullDetails.meals[0].strMeal}</p>
                            <p>{FullDetails.meals[0].strInstructions}</p>
                            <p>₹ {FullDetails.meals[0].idMeal.slice(1, 4)} /-</p>
                            <p class="card-text">
                                {CartItems[FullDetails.meals[0].idMeal] ? <div className='footerbutton'><button onClick={e => { e.stopPropagation(); handleAddtoCart(FullDetails.meals[0], FullDetails.meals[0].idMeal.slice(1, 4)) }}>+</button><p>{CartItems[FullDetails.meals[0].idMeal]}</p><button onClick={e => { e.stopPropagation(); handleRemovetoCart(FullDetails.meals[0], FullDetails.meals[0].idMeal.slice(1, 4)) }}>-</button></div> : <button className='addtocart' onClick={e => { e.stopPropagation(); handleAddtoCart(FullDetails.meals[0], FullDetails.meals[0].idMeal.slice(1, 4)) }}>Add to Cart</button>}</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
