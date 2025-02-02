import { OrderDto } from "@/types/order"
import "./styles/AllOrders.css"

type AllOrdersListProps = {
  orders: OrderDto[]
}

export default function AllOrdersList({ orders }: AllOrdersListProps) {
  return (
    <div className="orders-table-container">
      <table className="orders-table">
        <thead className="orders-table-header">
          <tr>
            <th className="orders-table-header-cell">Order ID</th>
            <th className="orders-table-header-cell">User ID</th>
            <th className="orders-table-header-cell">Total Price</th>
            <th className="orders-table-header-cell">Created At</th>
            <th className="orders-table-header-cell">Status</th>
            <th className="orders-table-header-cell">Payment Status</th>
            <th className="orders-table-header-cell">Games</th>
          </tr>
        </thead>
        <tbody className="orders-table-body">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="orders-table-body-cell">{order.id}</td>
              <td className="orders-table-body-cell">{order.userId}</td>
              <td className="orders-table-body-cell">${order.totalPrice.toFixed(2)}</td>
              <td className="orders-table-body-cell">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="orders-table-body-cell">{order.status}</td>
              <td className="orders-table-body-cell">{order.paymentStatus}</td>
              <td className="orders-table-body-cell">{order.games.length} game(s)</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
