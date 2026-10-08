export default function ProductCard({product,onAddToCart}){
    return(
        <>
        <img src={product.image} alt={product.name} height={120} width={120}/>
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <button onClick={()=>onAddToCart(product)}>Add To Cart</button>
        </>
    )
}