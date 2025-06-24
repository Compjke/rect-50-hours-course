import axios from "axios";
import { StepBack } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BeatLoader } from "react-spinners";
import type { Product } from "../Sidebar/types";
import { FullscreenImageViewer } from "./FullscreenImageViewer";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Изменено на null для явной проверки

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.images[0] || res.data.thumbnail); // Устанавливаем первое изображение или thumbnail
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  // Функция для обработки клика по маленькой картинке
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center flex-1 items-center h-screen">
        <BeatLoader color="#36d7b7" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center flex-1 items-center h-screen">
        Product not found
      </div>
    );
  }

  return (
    <div className="w-[60%] relative mx-auto">
      <button
        onClick={() => navigate(-1)}
        title="Go to previous page"
        className="absolute top-0 left-0 bg-black py-2 px-4 rounded self-start mt-3 ml-1 cursor-pointer"
      >
        <StepBack className="stroke-amber-200" />
      </button>
      <div className="p-4 mt-5">
        <div className="flex flex-col items-center gap-4">
          {/* Контейнер для основного изображения */}
          <div className="w-full max-w-md aspect-square bg-gray-200 rounded-lg flex items-center justify-center relative">
            {selectedImage ? (
              <FullscreenImageViewer
                src={selectedImage}
                alt={product.title}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BeatLoader color="#36d7b7" size={10} />
              </div>
            )}
          </div>

          {/* Миниатюры */}
          <div className="flex flex-wrap justify-center gap-2">
            {product.images.map((img) => (
              <div key={img} className="relative group">
                <img
                  src={img}
                  alt={product.title}
                  width={48}
                  height={48}
                  loading="lazy"
                  className={`w-12 h-12 object-cover p-2 border-2 rounded-2xl cursor-pointer transition-transform duration-200 hover:scale-110 ${
                    selectedImage === img
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleImageClick(img)}
                />
                <div className="absolute w-20 hidden group-hover:block z-10 -top-24 left-1/2 transform -translate-x-1/2">
                  <img
                    src={img}
                    alt={product.title}
                    className="w-48 h-auto rounded-lg shadow-lg border-2 border-gray-200 bg-slate-50/20"
                  />
                </div>
              </div>
            ))}
          </div>
          <h3 className="text-2xl font-bold">{product.title}</h3>
          <p className="text-lime-200">{product.description}</p>
          <div className="flex self-end gap-3 text-sm font-bold">
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};