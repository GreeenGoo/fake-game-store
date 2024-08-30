import { GlobalResponse } from "@/types"
import { OrderDto } from "@/types/order"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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

export function useDeleteGameFromCard() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id: string) => OrderService.deleteGameFromCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users/me/orders/current"] })
    }
  })

  return mutation
}
