import { calculateDiscount } from '../Model/promo.js'

export function validatePromo(req, res) {
  const { subtotal, code } = req.body || {}
  const { amount, code: normalized } = calculateDiscount(Number(subtotal) || 0, code)
  res.json({ data: { valid: amount > 0, discount: amount, code: normalized } })
}


