export const VALID_PROMOS = {
  SAVE10: { type: 'percent', value: 10 }, 
  FLAT100: { type: 'flat', value: 100 }, 
}

export function calculateDiscount(subtotal, code) {
  const key = String(code || '').toUpperCase()
  const promo = VALID_PROMOS[key]
  if (!promo) return { amount: 0, code: null }
  if (promo.type === 'percent') {
    return { amount: Math.round((subtotal * promo.value) / 100), code: key }
  }
  if (promo.type === 'flat') {
    return { amount: Math.min(promo.value, subtotal), code: key }
  }
  return { amount: 0, code: null }
}


