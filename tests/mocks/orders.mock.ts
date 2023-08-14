export const allOrdersFromDb = [
  {
    dataValues: {
      id: 1,
      userId: 1,
      productIds: [
        { id: 2, name: '', price: '', orderId: 1 },
        { id: 1, name: '', price: '', orderId: 1 },
      ]
    }
  },
  {
    dataValues: {
      id: 2,
      userId: 3,
      productIds: [
      { id: 4, name: '', price: '', orderId: 2 },
      { id: 3, name: '', price: '', orderId: 2 },
    ]
    }
  },
  {
    dataValues: {
      id: 3,
      userId: 2,
      productIds: [
      { id: 5, name: '', price: '', orderId: 3 },
    ]
    }
  }
];

export const allOrdersForComparison = [
  {
    id: 1,
    userId: 1,
    productIds: [2, 1]
  },
  {
    id: 2,
    userId: 3,
    productIds: [4, 3]
  },
  {
    id: 3,
    userId: 2,
    productIds: [5]
  }
]

export const allOrdersFromDbArrEmply = [
  {
    id: 1,
    userId: 1,
    productIds: [
      { id: 2, name: '', price: '', orderId: 1 },
      { id: 1, name: '', price: '', orderId: 1 },
    ]
  },
  {
    id: 2,
    userId: 3,
    productIds: [
    { id: 4, name: '', price: '', orderId: 2 },
    { id: 3, name: '', price: '', orderId: 2 },
  ]
  },
  {
    id: 3,
    userId: 2,
    productIds: [
    { id: 5, name: '', price: '', orderId: 3 },
  ]
  }
];

export const allOrdersForComparisonArrEmply = [
  {
    id: 1,
    userId: 1,
    productIds: []
  },
  {
    id: 2,
    userId: 3,
    productIds: []
  },
  {
    id: 3,
    userId: 2,
    productIds: []
  }
]