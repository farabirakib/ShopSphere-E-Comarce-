import React, { FC } from "react";

const SummarySection: FC<{
  subtotal: number;
  shipping: number;
  total: number;
  location: string;
  setLocation: (value: string) => void;
  handleCheckout: () => void;
}> = ({ subtotal, shipping, total, location, setLocation, handleCheckout }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-200 sticky top-20 mt-10">
      <h3 className="text-2xl text-black font-semibold mb-6 pb-4 border-b">
        Order Summary
      </h3>

      {/* Delivery Location */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Delivery Location
        </label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md w-full text-black"
        >
          <option value="dhaka">ঢাকার ভিতর – 70৳</option>
          <option value="outside">ঢাকার বাইরে – 130৳</option>
        </select>
      </div>

      <div className="space-y-4 text-black">
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

      <button
        className="w-full mt-6 py-3 bg-[#0B1A3A] text-white rounded-md text-lg font-medium cursor-pointer transition-colors hover:text-[#D4AF37]"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default SummarySection;
