"use client";
import React, { useState } from "react";
import { ProductStatus } from "../types";
import { IconTag, IconArchive, IconCheckCircle } from "./icons";
import FormField from "./FormField";
import ImageUpload from "./ImageUpload";
import Link from "next/link";
import { useList } from "../contexts/ProductContext";

const categories = [
  "Electronics",
  "Apparel & Accessories",
  "Home & Garden",
  "Books & Media",
  "Health & Beauty",
  "Toys & Games",
];

const ProductForm: React.FC = () => {
  const { product, setProduct, handleSubmit } = useList();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (status: ProductStatus) => {
    setProduct((prev) => ({ ...prev, status }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
      className="space-y-8 max-w-4xl mx-auto"
    >
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200/80">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Add New Product
        </h1>
        <p className="text-slate-500 mb-8">
          Fill in the details below to add a new product to your inventory.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="md:col-span-2">
            <FormField
              label="Product Name"
              name="name"
              type="text"
              value={product.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-700"
              >
                Description
              </label>
            </div>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 sm:text-sm placeholder:text-slate-400 px-4 py-3 transition-colors"
              placeholder="A detailed description of the product..."
            />
          </div>

          <ImageUpload currentImage={product.image} />

          <FormField
            label="Category"
            name="category"
            as="select"
            value={product.category}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </FormField>

          <FormField
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleInputChange}
            step="0.01"
            required
            prefix="$"
          />

          <FormField
            label="SKU"
            name="sku"
            type="text"
            value={product.sku}
            onChange={handleInputChange}
            required
          />

          <FormField
            label="Stock Quantity"
            name="stockQuantity"
            type="number"
            value={product.stockQuantity}
            onChange={handleInputChange}
            required
          />

          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              Product Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatusButton
                label="Published"
                icon={<IconTag />}
                isActive={product.status === ProductStatus.Published}
                onClick={() => handleStatusChange(ProductStatus.Published)}
              />
              <StatusButton
                label="Draft"
                icon={<IconArchive />}
                isActive={product.status === ProductStatus.Draft}
                onClick={() => handleStatusChange(ProductStatus.Draft)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-5 pt-2">
        <Link
          href={"/dashboard"}
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

interface StatusButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({
  label,
  icon,
  isActive,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex items-center gap-4 w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
      isActive
        ? "bg-indigo-50 border-indigo-500 shadow-sm"
        : "bg-white border-slate-300 hover:border-slate-400"
    }`}
  >
    <span
      className={`transition-colors ${
        isActive ? "text-indigo-600" : "text-slate-500"
      }`}
    >
      {icon}
    </span>
    <span
      className={`font-semibold transition-colors ${
        isActive ? "text-indigo-900" : "text-slate-700"
      }`}
    >
      {label}
    </span>
    {isActive && (
      <IconCheckCircle className="absolute top-3 right-3 h-6 w-6 text-indigo-600" />
    )}
  </button>
);

export default ProductForm;
