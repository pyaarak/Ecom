import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../StyleSheets/ItemList.scss'
import { useNavigate, useParams } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { removeFromCart, setAddtoCart } from '../Redux/Slice';

export default function ItemList() {
    const params = useParams()
    const CategoriesItems = useSelector((state) => state.CategoriesItems)
    const CartItems = useSelector((state) => state.CartItems.Cartdata)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddtoCart = (meal, price) => {
        let fullMeal = { ...meal, price: price }
        dispatch(setAddtoCart(fullMeal))
    }

    const handleRemovetoCart = (meal) => {
        dispatch(removeFromCart(meal))
    }

    return (
        <div className='item-wrapper'>
            {CategoriesItems?.isLoading &&
                <p>Loading....</p>
            }
            {CategoriesItems && !CategoriesItems.isLoading &&
                <div className='item-inner-wrapper'>
                    <p className='back_button'><ArrowBackIcon onClick={e => { navigate('/') }}></ArrowBackIcon></p>
                    <p className='Header'>{params.category}</p>
                    <div className='row'>
                        {CategoriesItems?.data?.meals?.length > 0 && CategoriesItems.data.meals.map((ele) => {
                            return (
                                <div className='col-md-4 col-lg-3 col-xl-2 col-sm-6 item-details' key={ele.idMeal} onClick={e => { navigate(`/${ele.idMeal}`) }}>
                                    <div className='card'>
                                        <img class="card-img-top" src={ele.strMealThumb} alt="Card image cap" />
                                        <div class="card-body">
                                            <p class="card-text">{ele.strMeal}</p>
                                            <p className='card-text'>₹ {ele.idMeal.slice(1, 4)} /-</p>
                                        </div>
                                        <div class="card-footer">
                                            <p class="card-text">{CartItems[ele.idMeal] ? <div className='footerbutton'><button onClick={e => { e.stopPropagation(); handleAddtoCart(ele, ele.idMeal.slice(1, 4)) }}>+</button><p>{CartItems[ele.idMeal]}</p><button onClick={e => { e.stopPropagation(); handleRemovetoCart(ele, ele.idMeal.slice(1, 4)) }}>-</button></div> : <button className='addtocart' onClick={e => { e.stopPropagation(); handleAddtoCart(ele, ele.idMeal.slice(1, 4)) }}>Add to Cart</button>}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            }
        </div>
    )
}
