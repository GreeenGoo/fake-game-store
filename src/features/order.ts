import { GlobalResponse } from "@/types"
import { GameOrderDto, OrderDto } from "@/types/order"
import { useQuery } from "@tanstack/react-query"
import OrderService from "../api/order"

export function useGetCurrentUserCard() {
  const {
    data: gamesData,
    isLoading,
    isError
  } = useQuery<GlobalResponse<OrderDto>>({
    queryKey: ["users/me/orders/current"],
    queryFn: OrderService.getCurrentUserCard
  })

  return {
    data: gamesData,
    isLoading,
    isError
  }
}
