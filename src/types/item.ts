export interface Item {
  id: string
  name: string
  price: number
  description: string
}

export interface CartState {
  items: Item[]
  isOpen: boolean
}