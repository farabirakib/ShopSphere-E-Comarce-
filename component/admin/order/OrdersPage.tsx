import OrderListProvider from "./context/OrderListProvider";
import OrderDataSection from "./OrderDataSection";

const OrdersPage = () => {
  return (
    <OrderListProvider>
      <OrderDataSection />
    </OrderListProvider>
  );
};

export default OrdersPage;
