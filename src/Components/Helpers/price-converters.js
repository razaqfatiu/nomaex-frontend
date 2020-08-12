export const calcDiscount = (price, discount) => {
  return price * (discount/100)
}

export const calcDiscountPrice = (price, discount, quantity) => {
  const pric = parseInt(price)
  const disc = parseFloat(discount)/100
  const quan = parseInt(quantity)
  return (pric - (pric * disc)) * quan
}