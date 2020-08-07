export const calcDiscount = (price, discount) => {
  return price * discount
}

export const calcDiscountPrice = (price, discount, quantity) => {
  const pric = parseInt(price)
  const disc = parseFloat(discount)
  const quan = parseInt(quantity)
  return (pric - (pric * disc)) * quan
}