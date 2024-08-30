import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/cartContext';

const CartProductDetail = ({cart}) => {

    const { updateItem } = useCart(); 
    const [quantities, setQuantities] = useState({});
    const [subTotals, setSubTotals] = useState({});
    const [totalAmount, setTotalAmount] = useState(cart.total_amount);


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
            return updateItem(body);
        });
    
        try {
            await Promise.all(promises);
            console.log('All cart items updated successfully');
        } catch (error) {
            console.log('Error updating cart items', error);
        }
    };
    

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
                        </tr>
                    </thead>
        
                    <tbody>
                    {cart.cart_items.map((item, index) => (
                        <tr key={index}>
                            <td><img className="Image" src={item.product.images[0]} alt="Product Image" /></td>
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
                                <div class="p-2 Cursor">
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