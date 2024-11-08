"use server";

import { db } from "@/lib/db";
import type { OrderStatus } from "@prisma/client";

export interface ShippingAddressProps {
  fullName: string;
  emailAddress: string;
  confirmationEmail: string;
  phoneNumber: string;
  city: string;
  houseNumber: string;
  streetName: string;
  postalCode: string;
  shippingCountry: string;
  userId: string | undefined;
}

export const createShippingAddress = async ({
  fullName,
  emailAddress,
  confirmationEmail,
  phoneNumber,
  city,
  houseNumber,
  streetName,
  postalCode,
  shippingCountry,
  userId,
}: ShippingAddressProps) => {
  await db.shippingAddress.create({
    data: {
      fullName,
      emailAddress,
      confirmationEmail,
      phoneNumber,
      city,
      houseNumber,
      streetName,
      postalCode,
      shippingCountry,
      user: {
        connect: { id: userId },
      },
    },
  });
};

export interface UpdateShippingAddressProps {
  addressId: string | undefined;
  data: {
    fullName: string;
    emailAddress: string;
    confirmationEmail: string;
    phoneNumber: string;
    city: string;
    houseNumber: string;
    streetName: string;
    postalCode: string;
    shippingCountry: string;
    userId: string | undefined;
  };
}

export const updateShippingAddress = async ({
  addressId,
  data,
}: UpdateShippingAddressProps) => {
  await db.shippingAddress.update({
    where: {
      id: addressId,
    },
    data: {
      ...data,
    },
  });
};

export const fetchShippingAddress = async ({
  userId,
}: {
  userId: string | undefined;
}) => {
  const shippingAddress = await db.shippingAddress.findMany({
    where: {
      userId,
    },
  });
  return shippingAddress;
};

export interface BillingAddressProps {
  fullName: string;
  emailAddress: string;
  confirmationEmail: string;
  phoneNumber: string;
  city: string;
  houseNumber: string;
  streetName: string;
  postalCode: string;
  shippingCountry: string;
  userId: string | undefined;
}

export const createbilllingAddress = async ({
  fullName,
  emailAddress,
  confirmationEmail,
  phoneNumber,
  city,
  houseNumber,
  streetName,
  postalCode,
  shippingCountry,
  userId,
}: BillingAddressProps) => {
  await db.billingAddress.create({
    data: {
      fullName,
      emailAddress,
      confirmationEmail,
      phoneNumber,
      city,
      houseNumber,
      streetName,
      postalCode,
      shippingCountry,
      user: {
        connect: { id: userId },
      },
    },
  });
};

export interface UpdateShippingAddressProps {
  addressId: string | undefined;
  data: {
    fullName: string;
    emailAddress: string;
    confirmationEmail: string;
    phoneNumber: string;
    city: string;
    houseNumber: string;
    streetName: string;
    postalCode: string;
    shippingCountry: string;
    userId: string | undefined;
  };
}

export const updateBillingAddress = async ({
  addressId,
  data,
}: UpdateShippingAddressProps) => {
  await db.billingAddress.update({
    where: {
      id: addressId,
    },
    data: {
      ...data,
    },
  });
};

export const fetchBillingAddress = async (userId: string | undefined) => {
  const billingAddress = await db.billingAddress.findFirst({
    where: { userId },
  });

  return billingAddress;
};

export const deleteBillingAddress = async (
  billingAddressId: string | undefined
) => {
  if (!billingAddressId) {
    throw new Error("Billing address ID is required.");
  }

  try {
    await db.billingAddress.delete({
      where: { id: billingAddressId },
    });
  } catch (error) {
    console.error("Error deleting billing address:", error);
    throw error;
  }
};

export const fetchBillingAllBillingAddress = async (
  userId: string | undefined
) => {
  const billingAddresses = await db.billingAddress.findMany({
    where: {
      userId,
    },
  });

  return billingAddresses;
};

export async function fetchOrders() {
  return await db.order.findMany({
    include: {
      OrderItem: true,
    },
  });
}

export const updateOrderStatus = async (
  orderId: string | null,
  status: OrderStatus
) => {
  await db.order.update({
    where: {
      id: orderId!,
    },
    data: {
      orderStatus: status,
    },
  });
};

export const deleteOrder = async (orderId: string | undefined) => {
  await db.order.delete({
    where: { id: orderId },
  });
};

export const fetchUserOrders = async (userId: string | undefined) => {
  const orders = await db.order.findMany({
    where: {
      userId,
    },
    include: {
      OrderItem: true,
      shippingAddress: true,
    },
  });

  return orders;
};
