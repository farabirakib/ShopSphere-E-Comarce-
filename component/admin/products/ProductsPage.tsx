"use client";
import Link from "next/link";
import StatusBadge from "../shared/StatusBadge";
import { useEffect, useState } from "react";
import { useTemplate } from "@/component/liveflashback/contexts/template/TemplateProvider";
import useApi from "@/component/liveflashback/utils/useApi";
import { handleAxiosError } from "@/component/liveflashback/utils/handleAxiosError";

const ProductsPage = () => {
  // const [products, setProducts] = useState<any[]>([]);
  // const { setMessage } = useTemplate();
  // const { get } = useApi();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await get<any>(`AddProduct`);
  //       setProducts(res);
  //     } catch (ex: any) {
  //       setMessage("error", handleAxiosError(ex));
  //     }
  //   };
  //   fetchData();
  // }, []);

  const [products, setProducts] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("https://admin.ashaa.xyz/api/AddProduct");
      const json = await res.json();
      setProducts(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-slate-800">Products</h2>
        <Link
          href={
            "/add-product?=vjnbjhvbiuewvbaiwebcibncibnvciuahbiuceh9y43u798ydf7454y3658f4qh394fnc934pfh834f67y5gf734hf9jec"
          }
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition"
        >
          Add New Product
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Product Name
              </th>
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Category
              </th>
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Price
              </th>
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Stock
              </th>
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Status
              </th>
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product: any) => (
                <tr
                  key={product.id}
                  className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50"
                >
                  <td className="p-4 text-slate-700 font-medium">
                    {product.title}
                  </td>
                  <td className="p-4 text-slate-700">
                    {product.categoryTitle}
                  </td>
                  <td className="p-4 text-slate-700">
                    {product.priceSale || 0}
                  </td>
                  <td
                    className={`p-4 font-medium ${
                      product.isInStock > 0 ? "text-slate-700" : "text-red-600"
                    }`}
                  >
                    {product.isInStock || 0}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="p-4 flex gap-4">
                    <a
                      href="#"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="text-red-600 hover:underline font-medium"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-slate-700">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductsPage;
