import { auth } from "@/auth";
import OrderHistory from "./Orders";

const OrdersPage = async () => {
  const sesssion = await auth();

  return <OrderHistory userId={sesssion?.user.id} />;
};

export default OrdersPage;
