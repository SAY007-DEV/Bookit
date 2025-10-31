
//  data
const experiences = [
  {
    id: '1',
    title: 'Kayaking',
    locationTag: 'Udupi',
    cityTag: 'Udupi, Karnataka',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    priceFrom: 999,
    imageUrl: 'https://media.istockphoto.com/id/1059380230/photo/woman-kayaking-in-fjord-in-norway.jpg?s=612x612&w=0&k=20&c=hnJL6b66SJc1kTsuoZPUdHDgcow3UhIC_ST9AL-oVN8=',
  },
  {
    id: '2',
    title: 'Nandi Hills Sunrise',
    locationTag: 'Bangalore',
    cityTag: 'Bangalore',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    priceFrom: 899,
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Coffee Trail',
    locationTag: 'Coorg',
    cityTag: 'Coorg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    priceFrom: 1299,
    imageUrl: 'https://media.istockphoto.com/id/1161905510/photo/centre-place.jpg?s=612x612&w=0&k=20&c=No1qhwQnJW5lBRXCMx0hL8ZdPVULH1vmP6g8PdZYZzk=',
  },
  {
    id: '4',
    title: 'Boat Cruise',
    locationTag: 'Sunderban',
    cityTag: 'Sunderban',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    priceFrom: 999,
    imageUrl: 'https://media.istockphoto.com/id/155375632/photo/tropical-paradise.jpg?s=612x612&w=0&k=20&c=pkKzP9C7hmjiplWWz_8fZf2NlwXIi9sn9GKY85QiQV8=',
  },
  {
    id: '5',
    title: 'Bunjee Jumping',
    locationTag: 'Manali',
    cityTag: 'Manali',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    priceFrom: 999,
    imageUrl: 'https://media.istockphoto.com/id/547436912/photo/bungee-jumping.jpg?s=612x612&w=0&k=20&c=yGAdtv_o5h9uzsLhHFxU9al_H-3EzgSCuqRiJ9Hq08A=',
  },
  {
    id: '6',
    title: 'Forest Walk',
    locationTag: 'Coorg',
    cityTag: 'Coorg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    priceFrom: 1299,
    imageUrl: 'https://media.istockphoto.com/id/1356626974/photo/rear-view-on-young-family-walking-on-avenue-in-autumn-colors.jpg?s=612x612&w=0&k=20&c=YpGEmt3f8C1bG7IKFXOt-SKkyGMhD0aeSeLiB_UW3qc=',
  },
  {
    id: '7',
    title: 'Kayaking',
    locationTag: 'Udupi',
    cityTag: 'Udupi, Karnataka',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    priceFrom: 999,
    imageUrl: 'https://media.istockphoto.com/id/1059380230/photo/woman-kayaking-in-fjord-in-norway.jpg?s=612x612&w=0&k=20&c=hnJL6b66SJc1kTsuoZPUdHDgcow3UhIC_ST9AL-oVN8=',
  },
  {
    id: '8',
    title: 'Bunjee Jumping',
    locationTag: 'Manali',
    cityTag: 'Manali',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    priceFrom: 999,
    imageUrl: 'https://media.istockphoto.com/id/547436912/photo/bungee-jumping.jpg?s=612x612&w=0&k=20&c=yGAdtv_o5h9uzsLhHFxU9al_H-3EzgSCuqRiJ9Hq08A=',
  },
]

export function getAllExperiences(req, res) {
  res.json({ data: experiences })
}

export function getExperienceById(req, res) {
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
}
