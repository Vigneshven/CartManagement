import axios from "axios"

const api_url = import.meta.env.VITE_API_URL

export const getProducts = async()=>{
    const res = await axios(`${api_url}/products`)
    return res.data
}

export const createProduct = async(product)=>{
    const res = await axios(`${api_url}/products`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        data:product
    })

    return res.data
}

export const getCart = async()=>{
    const res = await axios(`${api_url}/cart`)
    return res.data
}

export const addCartItem = async(cartItem)=>{
    const res = await axios(`${api_url}/cart`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        data:cartItem
    })

    return res.data
}

export const updateCartItems = async(id,cartItem)=>{
    const res = await axios(`${api_url}/cart/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        data:cartItem
    })

    return res.data
}

export const deleteCartItem = async(id)=>{
    await axios(`${api_url}/cart/${id}`,{
        method:"DELETE"
    })
}