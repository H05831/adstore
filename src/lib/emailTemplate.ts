import { db } from "@/lib/db";

interface MailOptionsProps {
  userEmail: string;
  orderId: string;
  createdAt: Date;
  shippingAddressId: string | null;
}

export const mailOptions = async ({
  userEmail,
  orderId,
  createdAt,
  shippingAddressId,
}: MailOptionsProps) => {
  // Fetch the shipping address data
  const shippingAddress = shippingAddressId
    ? await db.shippingAddress.findUnique({
        where: { id: shippingAddressId },
      })
    : null;

  // Construct the email HTML string
  const emailHtml = `
  <div style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f8f8f8;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <h1 style="color: #333; text-align: center;">Thanks You for Your Order!</h1>
      <p style="font-size: 18px; color: #555;">Your order has been successfully placed!</p>
      <p style="font-weight: bold; color: #333;">Order ID: <span style="color: #007bff;">${orderId}</span></p>
      <p style="font-weight: bold; color: #333;">Order Date: <span style="color: #007bff;">${createdAt.toISOString()}</span></p>

      ${
        shippingAddress
          ? `
        <h2 style="color: #333;">Shipping Address:</h2>
        <p style="color: #555; margin: 0;">${shippingAddress.fullName}</p>
        <p style="color: #555; margin: 0;">${shippingAddress.streetName} ${shippingAddress.houseNumber}</p>
        <p style="color: #555; margin: 0;">${shippingAddress.city}, ${shippingAddress.postalCode}</p>
        <p style="color: #555; margin: 0;">${shippingAddress.shippingCountry}</p>
      `
          : "<p style='color: #555;'>No shipping address provided.</p>"
      }

      <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;">

      <h3 style="color: #333;">We appreciate your business!</h3>
      <p style="color: #555;">If you have any questions or need further assistance, feel free to contact us.</p>

      <div style="text-align: center; margin-top: 30px;">
        <a href="mailto:support@yourcompany.com" style="padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Contact Support</a>
      </div>

      <footer style="margin-top: 30px; font-size: 14px; color: #999;">
        <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  </div>
`;

  return {
    from: "ADSTORE <aditya9923480640@gmail.com>",
    to: userEmail,
    subject: "Thanks for your order!",
    html: emailHtml,
  };
};
