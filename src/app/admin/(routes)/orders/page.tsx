"use client";

import { deleteOrder, fetchOrders, updateOrderStatus } from "@/actions/order";
import OrderSkeleton from "@/components/skeletons/OrderSkeleton";
import { OrderStatus } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import { useCallback, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";

const STATUS = [
  {
    label: "DELIVERED",
    color: "text-green-500",
    bg: "bg-green-100",
    hoverColor: "text-green-600",
    hoverBg: "bg-green-200",
  },
  {
    label: "PENDING",
    color: "text-yellow-500",
    bg: "bg-yellow-100",
    hoverColor: "text-yellow-600",
    hoverBg: "bg-yellow-200",
  },
  {
    label: "CANCELLED",
    color: "text-red-500",
    bg: "bg-red-100",
    hoverColor: "text-red-600",
    hoverBg: "bg-red-200",
  },
];

const Orders = () => {
  const [openOrder, setOpenOrder] = useState<string | null>(null);
  const [status, setStatus] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();

  const { mutate: handleDeleteOrder } = useMutation({
    mutationFn: async (orderId: string | undefined) => deleteOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order deleted successfully.");
    },
  });

  const handleDelete = (orderId: string) => {
    handleDeleteOrder(orderId);
  };

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await fetchOrders(),
  });

  const mutation = useMutation({
    mutationFn: async (order: { orderId: string; orderStatus: OrderStatus }) =>
      updateOrderStatus(order.orderId, order.orderStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleChangeOrderStatus = useCallback(
    (orderId: string, newStatus: OrderStatus) => {
      setStatus((prevStatus) => ({ ...prevStatus, [orderId]: newStatus }));
      setOpenOrder(null);
      mutation.mutate({ orderId, orderStatus: newStatus });
    },
    [mutation]
  );

  if (isError)
    return (
      <div className="text-center font-semibold text-3xl mt-4 text-red-500">
        Error fetching orders
      </div>
    );

  return (
    <div className="my-3 px-6 h-[85%] overflow-y-scroll scrollbar">
      <h1 className="text-3xl font-semibold mb-6">Orders</h1>
      {isLoading ? (
        <div className="flex flex-col gap-y-4">
          <OrderSkeleton />
          <OrderSkeleton />
        </div>
      ) : (
        <div className="space-y-8">
          {orders?.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-sm rounded-lg p-6 space-y-6"
            >
              {/* Order Details Header */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold">Order #ID{order.id}</h2>
                  <p className="text-sm text-gray-500">
                    Placed on{" "}
                    {format(new Date(order.createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div
                    className={`font-semibold px-4 py-2 rounded-full ${
                      order.isPaid
                        ? "bg-green-400/25 text-green-500"
                        : "bg-purple-400/25 text-purple-500"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Unpaid"}
                  </div>
                  <div
                    className={`border rounded-full px-4 py-2.5 text-sm font-medium flex gap-x-1 items-center justify-center -ml-2 cursor-pointer ${
                      STATUS.find((s) => s.label === order.orderStatus)?.bg
                    } ${
                      STATUS.find((s) => s.label === order.orderStatus)?.color
                    }`}
                    onClick={() =>
                      setOpenOrder((prev) =>
                        prev === order.id ? null : order.id
                      )
                    }
                  >
                    {order.orderStatus}
                    <BiChevronDown
                      size={22}
                      className={`transition ${openOrder ? "rotate-180" : ""}`}
                    />
                  </div>
                  <button
                    title="delete"
                    onClick={() => handleDelete(order.id)}
                    className="bg-rose-600 text-white px-5 py-2.5 rounded-lg font-semibold"
                  >
                    <RiDeleteBin6Line size={18} />
                  </button>
                </div>
              </div>

              {/* Status Dropdown */}
              {openOrder === order.id && (
                <div className="relative z-10">
                  <div className="absolute right-16 -top-7 bg-white shadow-md rounded-md mt-2 p-2 flex flex-col gap-y-2">
                    {STATUS.map((statusOption) => (
                      <button
                        key={statusOption.label}
                        className={`block w-full text-left px-4 py-2 text-sm font-semibold rounded-md ${statusOption.hoverColor} ${statusOption.hoverBg}`}
                        onClick={() =>
                          handleChangeOrderStatus(
                            order.id,
                            statusOption.label as OrderStatus
                          )
                        }
                      >
                        {statusOption.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Products</h3>
                <div className="space-y-4">
                  {order.OrderItem.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-md"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-gray-700">${item.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Amount */}
              <div className="flex justify-between items-center pt-4 border-t">
                <p className="font-semibold text-lg">Total:</p>
                <p className="text-lg font-semibold">${order.totalAmount}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
