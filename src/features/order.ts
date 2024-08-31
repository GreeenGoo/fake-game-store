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

export function useGetCurrentUserOrders() {
  const { data, isLoading, isError } = useQuery<GlobalResponse<OrderDto[]>>({
    queryKey: ["users/me/orders"],
    queryFn: OrderService.getCurrentUserOrders
  })

  return {
    data,
    isLoading,
    isError
  }
}

export function useCheckoutCurrentOrder() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => OrderService.checkoutCurrentOrder(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users/me/orders/current"] })
    }
  })

  return mutation
}

export function useAddGameToCard() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id: string) => OrderService.addGameToCard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users/me/orders/current"] })
    }
  })

  return mutation
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
