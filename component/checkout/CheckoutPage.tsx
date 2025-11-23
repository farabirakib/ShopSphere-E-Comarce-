import { useState } from "react";
import { CheckoutPageProps } from "../type";
import ShippingPolicy from "../shipping-policy/ShippingPolicy";
import { CheckoutFormSection } from "./CheckoutFormSection";

const CheckoutPage = ({ cart, setCart, setCurrentPage }: CheckoutPageProps) => {

  // Default delivery → Dhaka (true)
  const [insideDhaka, setInsideDhaka] = useState<boolean>(true);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    size: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Correct shipping charge
  const shipping = insideDhaka === true ? 70 : 130;
  const total = subtotal + shipping;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailTo = "liveflashback90@gmail.com";
    const subject = `New Order from ${formData.name}`;

    const locationText = insideDhaka ? "ঢাকার ভেতর" : "ঢাকার বাইরে";

    let body = `
New order received from liveflashback.

Customer Details:
-------------------
- Name: ${formData.name}
- Address: ${formData.address}
- Phone: ${formData.phone}
- Location: ${locationText}

Order Items:
-------------------
`;

    cart.forEach((item) => {
      body += `${item.product.name} (x${item.quantity}) - ৳${(
        item.product.price * item.quantity
      ).toFixed(2)}\n`;
    });

    body += `
-------------------
Size: ${formData.size}
Subtotal: ৳${subtotal.toFixed(2)}
Shipping: ৳${shipping.toFixed(2)}
Total: ৳${total.toFixed(2)}
`;

    const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    try {
      const a = document.createElement("a");
      a.href = mailtoLink;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      alert("Unable to open email client.");
    }

    setCart([]);
    setCurrentPage("orderConfirmation");
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-center text-4xl font-semibold mb-12 text-gray-800">
          Checkout
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white p-8 rounded-lg shadow-md border">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Shipping Information
            </h3>

            {cart.map((item) => (
              <div
                className="flex justify-between text-black text-xl font-medium mb-4"
                key={item.product.id}
              >
                <span>{item.product.name} x {item.quantity}</span>
                <span>৳{(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <CheckoutFormSection
              cart={cart}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              setFormData={setFormData}
              insideDhaka={insideDhaka}
              setInsideDhaka={setInsideDhaka}
            />
          </div>

          <div className="bg-white text-black p-8 rounded-lg shadow-md border sticky top-32">
            <h3 className="text-2xl font-semibold mb-6 pb-4 border-b">
              Your Order
            </h3>

            <div className="space-y-4 mb-4">
              {cart.map((item) => (
                <div className="flex justify-between" key={item.product.id}>
                  <span>{item.product.name} x {item.quantity}</span>
                  <span>৳{(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t pt-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span>৳{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Shipping</span>
                <span>৳{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4 border-t mt-4">
                <span>Total</span>
                <span>৳{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <ShippingPolicy />
      </div>
    </section>
  );
};

export default CheckoutPage;
