"use client";
import React, { useState, useCallback, useRef } from "react";
import { IconUpload, IconX } from "./icons";
import { useList } from "../contexts/ProductContext";
// use native <img> for external previews to avoid Next.js image domain config

interface ImageUploadProps {
  currentImage: File | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { preview, setPreview } = useList();

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          // 5MB limit
          alert("File is too large. Please select an image smaller than 5MB.");
          return;
        }
        setPreview?.(URL.createObjectURL(file));
        setFileName(file.name);
      }
    },
    [setPreview]
  );

  const handleRemoveImage = useCallback(() => {
    setPreview?.(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [setPreview]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // track whether current file has been uploaded to avoid duplicate uploads
  const [uploaded, setUploaded] = React.useState(false);

  // reset uploaded flag whenever a new file is chosen
  React.useEffect(() => {
    setUploaded(false);
  }, [fileName]);

  // when a file is selected (preview & fileName are set), upload it to /api/Upload/image
  React.useEffect(() => {
    const upload = async () => {
      const file = fileInputRef.current?.files?.[0] ?? null;
      if (!file || uploaded) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("https://admin.ashaa.xyz/api/Upload/image", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`Upload failed: ${res.statusText}`);
        }

        const data = await res.json();
        // If the API returns a hosted URL for the image, use it as preview
        if (data?.url && typeof data.url === "string") {
          // setPreview is optional in props, so call it only if provided
          setPreview?.(data.url);
        }

        setUploaded(true);
      } catch (err) {
        console.error("Image upload error:", err);
        alert("Image upload failed. Please try again.");
      }
    };

    if (fileName && preview) {
      upload();
    }
  }, [fileName, preview, uploaded]);

  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-slate-700">
        Product Image
      </label>
      <div className="mt-2 flex items-center gap-4">
        <div className="w-24 h-24 rounded-lg bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
          {preview ? (
            <img
              src={preview}
              alt="Product preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
          )}
        </div>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
          />
          <button
            type="button"
            onClick={handleUploadClick}
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <IconUpload />
            Upload Image
          </button>
          {fileName && (
            <div className="mt-2 flex items-center text-sm text-slate-600">
              <span className="truncate max-w-[200px]">{fileName}</span>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <IconX />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
