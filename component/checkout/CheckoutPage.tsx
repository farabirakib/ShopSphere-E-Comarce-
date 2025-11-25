import { useState } from "react";
import { CheckoutPageProps } from "../type";
import ShippingPolicy from "../shipping-policy/ShippingPolicy";
import { CheckoutFormSection } from "./CheckoutFormSection";
import useApi from "../liveflashback/utils/useApi";
import { useTemplate } from "../liveflashback/contexts/template/TemplateProvider";
import { handleAxiosError } from "../liveflashback/utils/handleAxiosError";

const CheckoutPage = ({ cart, setCart, setCurrentPage }: CheckoutPageProps) => {
  const [insideDhaka, setInsideDhaka] = useState();

  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const productNames = cart.map((item) => item.product.name).join(", ");
  const productIds = cart.map((item) => item.product.id).join(", ");
  const productSkus = cart.map((item) => item.product.sku).join(", ");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = insideDhaka ? 60.0 : 120.0;
  const total = subtotal + shipping;
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    address: string;
    phone: string;
    size: string;
    quantity?: string;
    shipping?: string;
    subtotal?: string;
    total?: string;
    productNames?: string;
    productIds?: string;
    productSkus?: string;
  }>({
    name: "",
    email: "",
    address: "",
    phone: "",
    size: "",
    quantity: quantity.toString(),
    shipping: shipping.toString(),
    subtotal: subtotal.toString(),
    total: total.toString(),
    productNames: productNames,
    productIds: productIds,
    productSkus: productSkus,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmitEX = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const emailTo = "liveflashback90@gmail.com";

  //   let body = `
  //           A new order has been placed on liveflashback.\n
  //           Customer Details:

  //           - Address: ${formData.address}
  //           - Phone: ${formData.phone}\n
  //           Order Summary:
  //           -------------------\n
  //       `;

  //   cart.forEach((item) => {
  //     body += `${item.product.name} (x${item.quantity}) - ৳${(
  //       item.product.price * item.quantity
  //     ).toFixed(2)}\n`;
  //   });

  //   body += `
  //           -------------------
  //           Size: ${formData.size}
  //           Subtotal: ৳${subtotal.toFixed(2)}
  //           Shipping: ৳${shipping.toFixed(2)}
  //           Total: ৳${total.toFixed(2)}
  //       `;

  //   // const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(

  //   // )}&body=${encodeURIComponent(body)}`;

  //   // Try to open mail client via a temporary anchor (more reliable in desktop browsers)
  //   try {
  //     const a = document.createElement("a");
  //     // a.href = mailtoLink;
  //     a.target = "_blank";
  //     a.rel = "noopener";
  //     // Append to DOM and click to trigger mail client
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   } catch (err) {
  //     // Fallback: copy mailto link to clipboard and inform user
  //     try {
  //       // await navigator.clipboard.writeText(mailtoLink);
  //       alert(
  //         "Could not open your mail client automatically. A mail link has been copied to your clipboard — paste it into your mail app to send the order."
  //       );
  //     } catch {
  //       alert(
  //         "Could not open mail client and could not copy link to clipboard. Please contact support or try from another device."
  //       );
  //     }
  //   }
  // };
  const { post } = useApi();
  const { setMessage } = useTemplate();

  const handleSubmit2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await post<{ message: string }>("Checkout", {
        fullName: formData.name,
        email: formData.email || " Anonymous",
        phone: formData.phone,
        address: formData.address,
        size: formData.size,
        subTotal: subtotal.toString(),
        total: total.toString(),
        shipping: shipping.toString(),
        quantity: formData.quantity,
        productName: formData.productNames,
        productId: formData.productIds,
        productSku: formData.productSkus,
      });
      console.log(res, "s");
      setMessage("success", res.message);
      setCart([]);
      setCurrentPage("orderConfirmation");
    } catch (ex) {
      setMessage("error", handleAxiosError(ex));
    } finally {
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("https://admin.ashaa.xyz/api/Checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email || " Anonymous",
          phone: formData.phone,
          address: formData.address,
          size: formData.size,
          subTotal: subtotal.toString(),
          total: total.toString(),
          shipping: shipping.toString(),
          quantity: formData.quantity,
          productName: formData.productNames,
          productId: formData.productIds,
          productSku: formData.productSkus,
          status: "Pending",
        }),
      });

      setCart([]);
      setCurrentPage("orderConfirmation");
    } catch (err) {
      console.error("POST Error:", err);
    }
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
                className="flex justify-between text-black text-2xl font-medium mb-4"
                key={item.product.id}
              >
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span className="font-medium">
                  ৳{(item.product.price * item.quantity).toFixed(2)}
                </span>
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
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    ৳{(item.product.price * item.quantity).toFixed(2)}
                  </span>
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
              <div className="flex justify-between text-xl font-bold text-gray-800 pt-4 border-t mt-4">
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
