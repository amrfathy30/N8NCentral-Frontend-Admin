/* eslint-disable react/prop-types */
"use client";

import { useCallback, useState, useEffect, type ChangeEvent } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { Button } from "primereact/button";

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  initialImage?: string | null;
  label?: string;
  className?: string;
  previewClassName?: string;
  error?: string;
}

export default function ImageUpload({
  onImageSelect,
  className,
  previewClassName,
  initialImage = null,
  label = "",
  error,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialImage);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    if (initialImage) {
      setPreview(initialImage);
    }
  }, [initialImage]);

  const handleFileSelect = useCallback(
    (file: File) => {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        onImageSelect(file);
      }
    },
    [onImageSelect],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith("image/"));
      if (imageFile) handleFileSelect(imageFile);
    },
    [handleFileSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const removeImage = () => {
    setPreview(null);
    onImageSelect(null);
  };

  return (
    <div className="space-y-2">
      {label && <label>{label}</label>}

      {preview ? (
        <div className="relative group">
          <div className={`relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200 ${previewClassName}`}>
            <img
              src={preview}
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = "/default.png";
              }}
              alt="Preview"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <Button
                type="button"
                severity="danger"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 duration-200 bg-white p-1 px-2 rounded-3xl"
                onClick={removeImage}
              >
                <X className="w-4 h-4 mr-1 text-red-600" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`relative w-full h-48 border-2 border-dashed rounded-lg transition-colors duration-200 cursor-pointer ${
            isDragOver
              ? "border-blue-400 bg-blue-50"
              : error
                ? "border-red-300 bg-red-50"
                : "border-gray-300 hover:border-gray-400 bg-gray-50"
          } ${className}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById("cover-image-input")?.click()}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
            <div
              className={`p-3 rounded-full mb-3 ${
                isDragOver ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              {isDragOver ? (
                <Upload className="w-6 h-6 text-blue-500" />
              ) : (
                <ImageIcon className="w-6 h-6" />
              )}
            </div>
            <p className="text-sm font-medium mb-1">
              {isDragOver
                ? "Drop image here"
                : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
          </div>

          <input
            id="cover-image-input"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
