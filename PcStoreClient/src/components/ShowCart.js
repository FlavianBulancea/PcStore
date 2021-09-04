import React, { useState, useEffect } from 'react'

import { CART } from '../utils/routeConstants';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { totalPrice } from '../utils/getTotalPrice';
import Axios from "axios";
import {url} from "../utils/api";
import {images} from '../assets/images'
import Button from "@material-ui/core/Button";

const ShowCart = (props) => {
    const [cart, setCart] = useState([])

    useEffect(() => {
        const getCart = () => {
            Axios.post(url.cart, {userId: props.userData.id})
                .then((res) => {
                    for(let i=0;i<res.data.length;i++) {
                        if (res.data[i].type === 'computer') {
                            res.data[i]['image'] = images.computer
                        }
                        if (res.data[i].type === 'laptop') {
                            res.data[i]['image'] = images.laptop
                        }
                        if (res.data[i].type === 'mobile') {
                            res.data[i]['image'] = images.mobile
                        }
                    }
                    setCart(res.data)
                })
                .catch((err) => {
                    alert(err)
                    console.log(err)
                })
        }
        getCart();
    }, [props.userData.id])


    const leaveHover = () => {
        setTimeout(() => {
            props.setOpenHover(false)
        }, 700);
    }

    const deleteItem = (item) => {
        let id = item.id
        Axios.delete(url.deleteFromCart, {data: {userId: props.userData?.id, deviceId: id}})
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        window.location.href = '/'
    }

    let showTotal = totalPrice(cart)
    return (
        <div className='show-current-cart'  onMouseLeave={() => leaveHover()}>
            <div className='pop-title'>Ultimele adaugate:</div>

            {cart?.length > 0 ? (
                <div className='pop-elements'>
                    {cart.map((item) => {
                        return (
                            <div key={item.id} className='grid-container-cart'>
                                <div className='item0'>
                                    <img
                                        src={item.image}
                                        alt={'prod'}
                                    />
                                </div>
                                <div className='item1'>{item.title}</div>
                                <div className='item2'>{item.price} RON</div>
                                <Button className='item3' size="small" onClick={() => deleteItem(item)}>Delete</Button>
                            </div>
                        );
                    })}
                    <div className='div-with-total'>
                        <div className='total1'>TOTAL: <span>{''} </span> </div>
                        <div className='total2'>{cart.length} produse</div>
                        <div className='total3'>{showTotal.toFixed(2)}$</div>
                    </div>
                </div>
            ) : (
                <div className='message-empty'>
                    Cosul tau este gol.
                </div>
            )}
            <div className='div-with-btn'>
                <button className='pop-button' onClick = {() => props.history.push(CART)}>
                    <div>
                        <ArrowForwardIosIcon/>
                        <ArrowForwardIosIcon/>
                    </div>
                    <p>Du-te la cos</p>
                </button>
            </div>
        </div>
    )
}

export default ShowCart