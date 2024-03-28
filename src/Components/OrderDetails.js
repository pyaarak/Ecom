import React from 'react'
import '../StyleSheets/OrderDetails.scss'
import { useSelector } from 'react-redux'

export default function OrderDetails() {
    const OrderItems = useSelector((state) => state.OrderItems.Orderdata)
    console.log(OrderItems)
    return (
        <div className='container-xl order_wrapper'>
            <div className='order_inner_Wrapper'>
                <p className='Header'>Orders</p>
                {OrderItems && OrderItems.length > 0 && OrderItems.map((ele) => {
                    return (
                        <div className='card'>
                            <p className='sub_Header'><p>Order Id : #{ele.OrderId}</p><p style={{fontWeight:700}}>Total : {ele.Totalvalue}</p></p>
                            {ele.Orders.map((details) => {
                                return (
                                    <div className='item-details' key={details.idMeal}>
                                        <div className='card cart_item'>
                                            <img class="card-img-left" src={details.strMealThumb} alt="Card image cap" />
                                            <div class="card-body">
                                                <p class="card-text">{details.strMeal}</p>
                                                <p class="card-text">₹ {details.price} /-</p>
                                            </div>
                                            <div class="card-footer">
                                                <p class="card-text">{details.noOfItems} x {details.price} = {details.TotalPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
