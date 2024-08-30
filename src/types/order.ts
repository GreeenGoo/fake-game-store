import { Game } from "./game"

export type OrderDto = {
  id: string
  userId: string
  totalPrice: number
  createdAt: Date
  status: OrderStatus
  paymentStatus: PaymentStatus
  games: GameOrderDto[]
}

export type GameOrderDto = {
  game: Game
  quantity: number
}

enum OrderStatus {
  PROCESSING = "PROCESSING",
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
  DELIVERED = "DELIVERED"
}

enum PaymentStatus {
  WAITING = "WAITING",
  PAID = "PAID",
  REJECTED = "REJECTED",
  UNPAID = "UNPAID"
}
