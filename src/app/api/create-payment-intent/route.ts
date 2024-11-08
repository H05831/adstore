import { auth } from "@/auth";
import { CartProductProps } from "@/hooks/useCart";
import { db } from "@/lib/db";
import { mailOptions } from "@/lib/emailTemplate";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Stripe from "stripe";
import { OAuth2Client } from "google-auth-library";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user.id) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const {
      cartProducts,
      shippingAddressId,
      billingAddressId,
      shippingMethod,
      sameAsShippingAddress,
    }: {
      cartProducts: CartProductProps[];
      shippingAddressId: string | undefined;
      billingAddressId: string | undefined;
      shippingMethod: string;
      sameAsShippingAddress: boolean;
    } = await req.json();

    if (!cartProducts || cartProducts.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty" },
        { status: 400 }
      );
    }

    const grandTotal = cartProducts.reduce(
      (acc: number, product: CartProductProps) => {
        const productTotal = (product.price || 0) * (product.quantity || 0);
        return acc + productTotal;
      },
      0
    );

    const orderData: any = {
      totalAmount: grandTotal,
      user: { connect: { id: session.user.id } },
      paymentStatus: "PENDING",
      shippingAddress: { connect: { id: shippingAddressId } },
      sameAsShippingAddress,
      shippingMethod,
      OrderItem: {
        create: cartProducts.map((product: CartProductProps) => ({
          productId: product.id!,
          name: product.name || "",
          image: product.image,
          quantity: product.quantity || 1,
          price: product.price || 0,
        })),
      },
    };

    if (billingAddressId && !sameAsShippingAddress) {
      orderData.billingAddress = {
        connect: { id: billingAddressId },
      };
    }

    const order = await db.order.create({
      data: orderData,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: grandTotal,
      currency: "usd",
      metadata: {
        userId: session.user.id,
        orderId: order.id,
      },
    });

    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.REDIRECT_URL
    );

    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    } as nodemailer.TransportOptions);

    // Email options
    const mail = await mailOptions({
      userEmail: session.user.email!,
      createdAt: order.createdAt,
      orderId: order.id,
      shippingAddressId: shippingAddressId!,
    });

    try {
      await transporter.sendMail(mail);
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
