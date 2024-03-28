import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, fetchCategoriesItems } from '../Redux/Api';
import '../StyleSheets/Home.scss';
import { setSelectedCategory } from '../Redux/Slice';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const dispatch = useDispatch();
    const CategoryDetails = useSelector((state) => state.CategoryDetails)
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(fetchCategories())
    }, [])
    return (
        <div className='home_wrapper'>
            <div className='container-xl home_inner_wrapper'>
                <p className='Header'>Select Categories</p>
                <div className='row'>
                    {CategoryDetails?.data?.meals?.length > 0 && CategoryDetails.data.meals.map((ele) => {
                        return (
                            <div className='col-sm-6 col-lg-3 cat-details' key={ele.strCategory}>
                                <div className='card' onClick={e => { navigate(`/items/${ele.strCategory}`) ;dispatch(fetchCategoriesItems(ele.strCategory)) }}>
                                    <div class="card-body">
                                        <p class="card-text">{ele.strCategory}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}
