import React from "react";

const charges = [
  { area: "ঢাকার মধ্যে", price: "70 টাকা" },
  { area: "ঢাকার বাইরে", price: "130 টাকা" },
];

const times = [
  "ঢাকার মধ্যে: অর্ডার করার পর ১-২ কর্মদিবসের মধ্যে",
  "ঢাকার বাইরে: অর্ডার করার পর ২-৪ কর্মদিবসের মধ্যে",
];

const sections = [
  {
    key: "charges",
    title: "ডেলিভারি চার্জ",
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-9m17.25 9v-9m-17.25-9h9.563c.621 0 1.125.504 1.125 1.125v4.5m-10.688 0H18.375a1.125 1.125 0 011.125 1.125v.625"
        />
      </svg>
    ),
    render: () => (
      <ul className="list-none space-y-1 text-black">
        {charges.map((c) => (
          <li key={c.area}>
            {c.area}: <strong>{c.price}</strong>
          </li>
        ))}
      </ul>
    ),
  },
  {
    key: "time",
    title: "ডেলিভারি সময়",
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    render: () => (
      <ul className="list-none space-y-1">
        {times.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    ),
  },
];

const ShippingPolicy: React.FC = () => (
  <div className="bg-gray-100 p-8 rounded-lg border border-gray-200 mt-10">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-300">
      ডেলিভারি ও শিপিং পলিসি
    </h3>
    <p className="mb-6 text-black">
      আমরা আমাদের প্রোডাক্টগুলো <strong>Stedfast Courier Service</strong> এর
      মাধ্যমে ডেলিভারি করে থাকি, যাতে আপনি নিরাপদ ও দ্রুত সার্ভিস পান।
    </p>

    <div className="flex flex-col md:flex-row gap-8 md:gap-12">
      {sections.map((s) => (
        <div className="flex-1 text-black" key={s.key}>
          <h4 className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-3">
            {s.icon}
            {s.title}
          </h4>
          {s.render()}
        </div>
      ))}
    </div>
  </div>
);

export default ShippingPolicy;
