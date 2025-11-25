import React, { FC } from "react";

export const CheckoutFormSection: FC<{
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: {
    name: string;
    email: string;
    address: string;
    phone: string;
    size: string;
  };
  handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  setFormData: React.Dispatch<
    React.SetStateAction<{
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
    }>
  >;
  cart: { product: { id: string | number } }[];
  insideDhaka?: boolean;
  setInsideDhaka?: React.Dispatch<React.SetStateAction<any>>;
}> = ({
  handleSubmit,
  formData,
  handleInputChange,
  setFormData,
  cart,
  insideDhaka,
  setInsideDhaka,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mb-6">
        <select
          required
          id={`size-${cart[0]?.product.id}`}
          name="size"
          value={formData.size || ""}
          onChange={(e) => {
            const { value } = e.target;
            setFormData((prev) => ({ ...prev, size: value }));
          }}
          className="border w-full h-12 border-gray-300 rounded-md px-2 py-1 bg-white text-black"
        >
          <>
            <option value="" disabled>
              Select size
            </option>
            {["M", "L", "XL"].map((size) => (
              <option key={size} value={size.toLowerCase()} label={size}>
                {size}
              </option>
            ))}
          </>
        </select>
        <label
          htmlFor={`size-${cart[0]?.product.id}`}
          className="absolute -top-2.5 left-3 text-sm text-gray-600 bg-white px-1"
        >
          Size
        </label>
      </div>
      <div className="relative mb-6">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Full Name"
          className="peer w-full p-3.5 border text-black border-gray-300 rounded-md bg-white placeholder-transparent focus:outline-none focus:border-[#0B1A3A] focus:ring-1 focus:ring-[#0B1A3A]"
        />
        <label
          htmlFor="name"
          className="absolute -top-2.5 left-3 text-sm text-gray-600 bg-white px-1 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#0B1A3A]"
        >
          পূর্ণ নাম
        </label>
      </div>
      <div className="relative mb-6">
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Email Address"
          className="peer w-full p-3.5 border border-gray-300 text-black rounded-md bg-white placeholder-transparent focus:outline-none focus:border-[#0B1A3A] focus:ring-1 focus:ring-[#0B1A3A]"
        />
        <label
          htmlFor="name"
          className="absolute -top-2.5 left-3 text-sm  text-gray-600 bg-white px-1 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#0B1A3A]"
        >
          ইমেইল
        </label>
      </div>
      <div className="relative mb-6 text-black">
        <div className="text-sm font-medium  mb-2">অবস্থান</div>
        <div className="flex items-center gap-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="location"
              value="inside"
              checked={insideDhaka === true}
              onChange={() => setInsideDhaka && setInsideDhaka(true)}
              required
              className="h-4 w-4 text-[#0B1A3A] border-gray-300"
            />
            <span className="text-sm">ঢাকার ভেতর </span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="location"
              value="outside"
              checked={insideDhaka === false}
              onChange={() => setInsideDhaka && setInsideDhaka(false)}
              className="h-4 w-4 text-[#0B1A3A] border-gray-300"
            />
            <span className="text-sm">ঢাকার বাইরে</span>
          </label>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          একটি অপশন নির্বাচন করুন — ঢাকার ভেতর হলে ডেলিভারি চার্জ 60 টাকা ,
          ঢাকার বাইরে: 120 টাকা।
        </div>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          placeholder="Address / Location"
          className="peer w-full p-3.5 border text-black border-gray-300 rounded-md bg-white placeholder-transparent focus:outline-none focus:border-[#0B1A3A] focus:ring-1 focus:ring-[#0B1A3A]"
        />
        <label
          htmlFor="address"
          className="absolute -top-2.5 left-3 text-sm text-gray-600 bg-white px-1 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#0B1A3A]"
        >
          অবস্থান / ঠিকানা
        </label>
      </div>

      <div className="relative mb-6">
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          placeholder="Phone Number"
          className="peer w-full p-3.5 border text-black border-gray-300 rounded-md bg-white placeholder-transparent focus:outline-none focus:border-[#0B1A3A] focus:ring-1 focus:ring-[#0B1A3A]"
        />
        <label
          htmlFor="phone"
          className="absolute -top-2.5 left-3 text-sm text-gray-600 bg-white px-1 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#0B1A3A]"
        >
          ফোন নম্বর
        </label>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-[#0B1A3A] text-white rounded-md text-lg font-medium cursor-pointer transition-colors hover:text-[#D4AF37]"
      >
        Place Order
      </button>
    </form>
  );
};
