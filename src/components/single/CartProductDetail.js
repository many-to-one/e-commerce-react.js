import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

const CartProductDetail = ({cart}) => {

    const { updateItem, deleteCartItem, deleteCart } = useCart(); 
    const [quantities, setQuantities] = useState({});
    const [subTotals, setSubTotals] = useState({});
    const [totalAmount, setTotalAmount] = useState(cart.total_amount);

    const navigate = useNavigate();


    // Initialize quantities and subtotals state from cart items
    useEffect(() => {
        const initialQuantities = {};
        const initialSubTotals = {};

        cart.cart_items.forEach(item => {
            initialQuantities[item.product.id] = item.quantity;
            initialSubTotals[item.product.id] = item.subtotal;
        });

        setQuantities(initialQuantities);
        setSubTotals(initialSubTotals);

        // Calculate total amount
        const total = Object.values(initialSubTotals).reduce((sum, subtotals) => sum + subtotals, 0).toFixed(2);
        setTotalAmount(total);
    }, [cart]);


    // UPDATE THE QUANTITY OF EACH ITEM IN STATE
    const handleQuantityChange = (productId, delta) => {

        console.log('handleQuantityChange delta:', delta)

        setQuantities((prevQuantities) => {
            const newQuantity = prevQuantities[productId] + delta;
            if (newQuantity > 0) {
                // Update state
                return {
                    ...prevQuantities,
                    [productId]: newQuantity,
                };
            }
            
            return prevQuantities; 
        });

        updatesubTotal(productId, delta);
    }


    // UPDATE THE SUNTOTAL QUANTITY OF EACH ITEM IN STATE
    const updatesubTotal = (productId, delta) => {

        const itemPrice = cart.cart_items.find(item => item.product.id === productId).product.price;
        const quant = quantities[productId] + delta;
        const newSubtotal = (itemPrice * quant).toFixed(2);
        console.log('updatesubTotal before:', itemPrice, quant)
        console.log('updatesubTotal itemPrice:', newSubtotal)

        setSubTotals((prevSubTotal) => {
            return {
                ...prevSubTotal,
                [productId]: parseFloat(newSubtotal),
            }
        })

        // Calculate the new total amount by summing all subtotals
        const newTotalAmount = Object.values({
            ...subTotals,
            [productId]: parseFloat(newSubtotal),
        }).reduce((sum, subtotal) => sum + subtotal, 0);

        setTotalAmount(newTotalAmount);

    }


    // UPDATE CART DATA
    const updateItem_ = async () => {
        const promises = cart.cart_items.map(async (c) => {
            const body = {
                cart_id: cart.id,
                cart_item_id: c.id,
                product_id: c.product_id,
                quantity: quantities[c.product.id]
            };
            return await updateItem(body);
        });
    
        try {
            const res = await Promise.all(promises);
            console.log('All cart items updated successfully', res);
            const allSuccessful = res.every(response => {
                if (!response) {
                    console.log('Undefined response:', response);
                    return false; // Fail the check if any response is undefined
                }
                console.log('Response promise:', response);
                return response.status === 201 || response.status === 200;
            });
        
            if (allSuccessful) {
                navigate('/payment', {
                    state: {
                        cartId: cart.id,
                        totalAmount: cart.total_amount,
                        otherData: 'some other data' // You can pass any data you want
                    }
                });
            } else {
                console.log('Some items were not updated successfully');
            }

        } catch (error) {
            console.log('Error updating cart items', error);
        }
    };


    const deleteProduct = async(id) => {   

       const response = await deleteCartItem(id)
       if ( response.status === 200 ) {
        window.location.reload()
        }
    }


    const goBack = async() => {
        navigate('/products')
    }
    

  return (

    <div className='CartDetailCont'>
        
            <div className=''>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Produkt</th>
                            <th scope="col">Cena</th>
                            <th scope="col">Ilość</th>
                            <th scope="col">Razem</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
        
                    <tbody>
                    {cart.cart_items.map((item, index) => (
                        <tr key={index}>
                            <td><img className="Image" src={item.product.thumbnail} alt="Product Image" /></td>
                            <td>{item.product.title}</td>
                            <td>{item.product.price}</td>
                            <td>
                                <nav aria-label="...">
                                    <ul class="pagination pagination-sm">
                                        <li class="page-item Cursor"><a class="page-link" onClick={() => handleQuantityChange(item.product.id, -1)}>-</a></li>
                                        <li class="page-item active" aria-current="page">
                                            <span class="page-link">{quantities[item.product.id]}</span>
                                        </li>
                                        <li class="page-item Cursor"><a class="page-link" onClick={() => handleQuantityChange(item.product.id, 1)}>+</a></li>
                                    </ul>
                                </nav>
                            </td>
                            <td>{subTotals[item.product.id]}</td>
                            <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash3 Cursor" viewBox="0 0 16 16" onClick={() => deleteProduct(item.id)}>
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                            </td>
                        </tr> 
                    ))}    
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><b>Do zapłaty:</b></td>
                            <td><b>{totalAmount}</b></td>
                        </tr>                   
                    </tbody>
                    
                    </table>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="row justify-content-between">

                        <div class="col-4">
                            <div class="d-flex flex-row mb-3">
                                <div class="p-2 Cursor" onClick={goBack}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                                    </svg>
                                </div>
                                <div class="p-2">Kontynuuj zakupy</div>
                            </div>
                        </div>

                        <div class="col-4">
                            <button type="button" className="btn btn-success PayBtn" onClick={updateItem_}>Zapłać</button>
                        </div>

                    </div>
                </div>
            </div>
        
    </div>
  
  )
}

export default CartProductDetail