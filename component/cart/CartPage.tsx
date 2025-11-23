import { useState } from "react";
import { CartPageProps } from "../type";
import ShippingPolicy from "../shipping-policy/ShippingPolicy";
import SummarySection from "./SummarySection";
import { CartItemSection } from "./CartItem";

const CartPage = ({
  cart,
  updateCartQuantity,
  removeFromCart,
  handleCheckout,
}: CartPageProps) => {

  // Delivery Location State
  const [location, setLocation] = useState("dhaka");

  const shipping = location === "dhaka" ? 70 : 130;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <section className="py-16 h-1/2 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold mb-4 text-gray-800">
            Your Cart is Empty
          </h2>
          <p className="text-lg">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-center text-4xl font-semibold mb-12 text-gray-800">
          Your Shopping Cart
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8 items-start">
          <CartItemSection
            cart={cart}
            removeFromCart={removeFromCart}
            updateCartQuantity={updateCartQuantity}
          />

          {/* Order Summary */}
          <SummarySection
            handleCheckout={handleCheckout}
            shipping={shipping}
            subtotal={subtotal}
            total={total}
            location={location}
            setLocation={setLocation}
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <ShippingPolicy />
        </div>
      </div>
    </section>
  );
};

export default CartPage;
