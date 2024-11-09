"use client";

import { fetchUserOrders } from "@/actions/order";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FaCalendarAlt, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";

const OrderHistory = ({ userId }: { userId: string | undefined }) => {
  const { data: orders } = useQuery({
    queryKey: ["orders-history"],
    queryFn: async () => await fetchUserOrders(userId),
  });

  return (
    <div className="px-4 sm:px-8 lg:px-20 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Order History
      </h1>
      {!orders || orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="font-semibold text-lg mb-4 text-gray-700">
                Order ID: <span className="text-gray-900">{order.id}</span>
              </h2>

              {/* Order Date and Status */}
              <div className="flex items-center mb-4 space-x-4">
                <div className="flex items-center text-gray-500">
                  <FaCalendarAlt className="mr-2" />
                  <span>{`${order.createdAt.getDate()}-${
                    order.createdAt.getMonth() + 1
                  }-${order.createdAt.getFullYear()}`}</span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.isPaid
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>

              {/* Total Amount */}
              <div className="flex items-center text-gray-700 font-semibold text-lg mb-4">
                <FaDollarSign className="mr-2 text-green-500" />
                <span>Total Amount: ${order.totalAmount}</span>
              </div>

              {/* Shipping Address */}
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="text-gray-700 font-medium mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-blue-500" />
                  Shipping Address
                </h3>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress?.streetName}
                </p>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.postalCode}
                </p>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress?.shippingCountry}
                </p>
              </div>

              {/* Order Items */}
              <h3 className="text-lg font-medium text-gray-700 mb-2">Items:</h3>
              <div className="space-y-3">
                {order.OrderItem.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="w-24 h-24 relative mr-4">
                      <Image
                        src={item.image}
                        alt="Product image"
                        fill
                        className="object-contain rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        Price: ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
