import { Router } from 'express'

const router = Router()

// Temporary in-memory data to simulate backend results
const experiences = [
  {
    id: '1',
    title: 'Kayaking',
    locationTag: 'Udupi',
    cityTag: 'Udupi, Karnataka',
    description:
      'Curated small-group experience. Certified guide. Safety first with gear included.',
    priceFrom: 999,
    imageUrl:
      'https://images.unsplash.com/photo-1526328828355-cb2c6b37a3a0?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Nandi Hills Sunrise',
    locationTag: 'Bangalore',
    cityTag: 'Bangalore',
    description:
      'Curated small-group experience. Certified guide. Safety first with gear included.',
    priceFrom: 899,
    imageUrl:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Coffee Trail',
    locationTag: 'Coorg',
    cityTag: 'Coorg',
    description:
      'Curated small-group experience. Certified guide. Safety first with gear included.',
    priceFrom: 1299,
    imageUrl:
      'https://images.unsplash.com/photo-1453487977089-77350a275ec5?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Boat Cruise',
    locationTag: 'Sunderban',
    cityTag: 'Sunderban',
    description:
      'Curated small-group experience. Certified guide. Safety first with gear included.',
    priceFrom: 999,
    imageUrl:
      'https://images.unsplash.com/photo-1516542076529-1ea3854896e1?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Bunjee Jumping',
    locationTag: 'Manali',
    cityTag: 'Manali',
    description:
      'Curated small-group experience. Certified guide. Safety first with gear included.',
    priceFrom: 999,
    imageUrl:
      'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Forest Walk',
    locationTag: 'Coorg',
    cityTag: 'Coorg',
    description:
      'Curated small-group experience. Certified guide. Safety first with gear included.',
    priceFrom: 1299,
    imageUrl:
      'https://images.unsplash.com/photo-1471189641895-16c58a695bcb?q=80&w=1200&auto=format&fit=crop',
  },
]

router.get('/experiences', (req, res) => {
  res.json({ data: experiences })
})

// Individual experience details with dates and slots
router.get('/experiences/:id', (req, res) => {
  const { id } = req.params
  const base = experiences.find((e) => e.id === id)
  if (!base) return res.status(404).json({ message: 'Not found' })

  const today = new Date()
  const toISO = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0]

  const days = [0, 1, 2, 3, 4].map((n) => {
    const d = new Date(today)
    d.setDate(today.getDate() + n)
    return toISO(d)
  })

  const payload = {
    ...base,
    startsAt: base.priceFrom,
    availableDates: days,
    slotsByDate: days.reduce((acc, date, idx) => {
      acc[date] = [
        { id: `${date}-0700`, label: '07:00 am', left: 4 - (idx % 3), price: base.priceFrom, soldOut: idx === 4 },
        { id: `${date}-0900`, label: '09:00 am', left: 2 - (idx % 2), price: base.priceFrom, soldOut: idx === 2 },
        { id: `${date}-1100`, label: '11:00 am', left: 5 - (idx % 4), price: base.priceFrom, soldOut: false },
        { id: `${date}-1300`, label: '01:00 pm', left: 0, price: base.priceFrom, soldOut: idx === 1 },
      ]
      return acc
    }, {}),
  }

  res.json({ data: payload })
})

export default router


