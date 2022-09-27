const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => response.json())
}

const postNewOrder = (orderData) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(orderData)
  })
    .then(response => response.json())
}

export {getOrders, postNewOrder}