export const calcShippingDiscount = (shippingPrice, quantity) => {
  shippingPrice = shippingPrice * quantity
  const fixedShippingPrice = shippingPrice
  const tenPercentOff = shippingPrice * 0.1
  if (quantity < 10) return shippingPrice
  else if (quantity >= 10) {
    shippingPrice = shippingPrice - tenPercentOff
    const actual = Math.floor(quantity / 10)
    const actualPercentage = actual * 0.02
    const getToAdditionalPercentOff = fixedShippingPrice * actualPercentage
    shippingPrice = shippingPrice - getToAdditionalPercentOff
    return shippingPrice
  }
}