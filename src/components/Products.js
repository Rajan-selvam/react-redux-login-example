import React , {useState,useEffect} from "react";

import productService from "../services/product.service";

const ProductsPage = () => {
    const [products,setProduct] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [Error , setError] = useState('');

    const pages = new Array(numberOfPages).fill(null).map((v,i) => i);

    useEffect(()=>{
        productService.getAllProducts(pageNumber).then((response)=>{
            setProduct(response.data.product); 
            setTotalProduct(response.data.total);
            setNumberOfPages(response.data.totalPage);
        },(error)=>{
            const _content = (error.response &&
                error.response.data &&
                error.response.data.message) || error.message || error.toString();
                setError(_content);
        });
    },[pageNumber]);

    const product = products && products.map((item,index) => (
    <div key={index} className="card card-container">
        <h1>Product Name: {item.name}</h1>
        <span>Description: {item.description}</span>
        <span>Price: {item.price}</span>
        <span>Rating: {item.rating}</span>
    </div>
    ));
    return (
        <>
        { Error && <header className="jumbotron"><h3>{Error}</h3></header> }
        { !Error &&
         <div className="container">
            <header className="jumbotron">
                <h2> Total Product is {totalProduct}</h2>
                {product && product}
            </header>
            <button onClick={() => setPageNumber(Math.max(0,pageNumber - 1))}>Previous</button>
            {pages.map((pageIndex) => (
                <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>{pageIndex + 1}</button>
            ))}
            <button onClick={() => setPageNumber(Math.min(numberOfPages -1,pageNumber + 1))}>Next</button>
            <p> Page of {pageNumber + 1}</p>
        </div>
        }
        </>
    );
}

export default ProductsPage;