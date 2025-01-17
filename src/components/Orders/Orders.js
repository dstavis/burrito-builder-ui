import React from 'react';
import './Orders.css';

const Orders = props => {
  const orderElements = props.orders.map(order => {
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map( (ingredient, index) => {
            return <li key={index}>{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });

  return (
    <section className="orders-list">
      { orderElements.length ? orderElements : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;