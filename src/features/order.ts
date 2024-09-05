import { GlobalResponse } from "@/types"
import { OrderDto, PayForOrder } from "@/types/order"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import OrderService from "../api/order"
import { useSnackbar } from "notistack"

export function useAllOrders() {
  const { data, isLoading, isError } = useQuery<GlobalResponse<OrderDto[]>>({
    queryKey: ["orders"],
    queryFn: OrderService.getAllOrders
  })

  return {
    data,
    isLoading,
    isError
  }
}

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

export function usePayCurrentOrder() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (payCurrentOrderProps: PayForOrder) =>
      OrderService.payCurrentOrder(payCurrentOrderProps),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users/me/orders"] })
    }
  })

  return mutation
}

export function useCheckoutCurrentOrder() {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => OrderService.checkoutCurrentOrder(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users/me/orders/current"] })
    },
    onError: (error) => {
      enqueueSnackbar(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        "Error when checking out " + JSON.stringify(error.response.data.error.errorMessage),
        {
          variant: "error",
          autoHideDuration: 4000
        }
      )
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

export function useCleanCurrentUserCard() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => OrderService.cleanCurrentUserCard(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users/me/orders/current"] })
    }
  })

  return mutation
}
