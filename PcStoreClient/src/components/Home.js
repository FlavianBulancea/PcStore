import React, {useState, useEffect} from 'react';

import ProductCard from "./ProductCard";
import TopBar from "./TopBar";
import MenuBar from "./MenuBar";


import {url} from '../utils/api'
import {images} from '../assets/images'


import Axios from 'axios'



const Home = ({history}) => {
    const [products, setProducts] = useState([])
    const [trueProducts, setTrueProducts] = useState([])
    const [userData, setUserData] = useState([])
    const [filtrated, setFilt] = useState([])

    useEffect(() => {
        const getProducts = () => {
            Axios.get(url.products)
                .then((res) => {
                    let localProducts = []
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
                    localProducts = res.data.filter((item, index, self) => {
                        return index === self.findIndex((t) => (t.title === item.title))
                    })

                    console.log(localProducts)
                    setTrueProducts(localProducts)
                    setFilt(localProducts)
                    setProducts(res.data)
                })
                .catch((err) => {
                    alert(err)
                    console.log(err)
                })
        }
        getProducts();
    }, [])

    useEffect(() => {
        let localData = JSON.parse(localStorage.getItem('user'))
        setUserData(localData)
    }, [])

    const filterProducts = (filter) => {
        let prod = [...trueProducts]
        prod = prod.filter(item => item.type === filter)
        setFilt(prod)
        if (filter === ' ') setFilt(trueProducts)
    }

    return (
        <>
            <TopBar history={history} userData={userData}/>
            <MenuBar filterProducts={filterProducts}/>
            <div className='product-container'>
                {filtrated.map((item, index) => {
                    return(
                        <ProductCard
                            key={index}
                            userId={userData?.id}
                            name={item.title}
                            price={item.price}
                            description={item.description}
                            image={item.image}
                            product={item}
                        />
                    )
                })}
            </div>
        </>


    )
}

export default Home