import OrderDetails from "@/components/OrderDetails";
import { db } from "@/lib/db";
import { FaRegCircleCheck } from "react-icons/fa6";

interface ThankYouPageProps {
  searchParams: {
    orderId: string | undefined;
  };
}

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-y-1 bg-gray-50 p-4 rounded-lg shadow-sm">
    <h5 className="text-slate-700 font-semibold">{title}</h5>
    <span className="text-sm text-slate-500">{children}</span>
  </div>
);

const ThankYouPage = async ({ searchParams }: ThankYouPageProps) => {
  const { orderId } = searchParams;

  if (!orderId) {
    return (
      <p className="text-red-500">
        Order ID is missing. Please check your order link.
      </p>
    );
  }

  const order = await db.order.findUnique({ where: { id: orderId } });
  if (!order) {
    return (
      <p className="text-red-500">
        Order not found. Please check your order link.
      </p>
    );
  }

  const user = await db.user.findUnique({ where: { id: order.userId } });

  return (
    <div className="w-full flex flex-col items-center justify-center mt-10 mb-16 px-4">
      <div className="bg-white w-full max-w-2xl flex flex-col gap-y-6 rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center gap-y-3 text-center">
          <div className="bg-green-100 p-3 rounded-full">
            <FaRegCircleCheck size={50} className="text-green-600" />
          </div>
          <h4 className="text-xl font-bold text-green-700 mt-2">
            Thank You for Your Order!
          </h4>
          <p className="text-sm text-gray-500">
            {user?.email
              ? `A confirmation has been sent to ${user.email}`
              : "We couldn't retrieve your email. Please contact support if needed."}
          </p>
        </div>

        <div className="flex flex-col gap-y-5">
          <Section title="Transaction Date">
            {order.createdAt ? formatDate(order.createdAt) : "Date unavailable"}
          </Section>

          <Section title="Payment Method">Mastercard ending with 2564</Section>

          <Section title="Shipping Method">
            {order.shippingMethod || "Standard Shipping"}
            <button className="mt-3 inline-block text-blue-600 font-semibold underline hover:text-blue-800 focus:outline-none">
              Track Order
            </button>
          </Section>
        </div>

        <OrderDetails isThisThankYouPage />
      </div>
    </div>
  );
};

export default ThankYouPage;
