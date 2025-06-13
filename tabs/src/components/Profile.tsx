import { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { Tabs } from './Tabs';
import { randomDefaultIndex } from '../utils/utils';

// const bannerVariants = [
//   {
//     id: 'webp-banner-1',
//     baseUrl: 'https://placehold.co/1200x500',

//     srcSet: [
//       'https://placehold.co/1200x500.webp?text=Banner+1-WebP+1200W&font=roboto 1200w',
//       'https://placehold.co/800x400/webp?text=Banner+1-WebP+800W&font=roboto 800w',
//       'https://placehold.co/400x200/webp?text=Banner+1-WebP+400W&font=roboto 400w',
//       'https://placehold.co/1200x500/png?text=Banner+1-PNG+1200W&font=roboto 1200w',
//       'https://placehold.co/800x400/png?text=Banner+1-PNG+800W&font=roboto 800w',
//       'https://placehold.co/400x200/png?text=Banner+1-PNG+400W&font=roboto 400w',
//     ],
//     media: '(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 1200px',
//     fallback:
//       'https://placehold.co/1200x500/png?text=FallbackWebPBanner+1+PNG+1200&font=roboto',
//     alt: 'Banner 1 with custom text and Roboto font',
//   },
//   {
//     id: 'orange-banner-2',
//     baseUrl: 'https://placehold.co/1000x450/orange/white',
//     srcSet: [
//       'https://placehold.co/1000x450/orange/white/jpeg?text=Banner+2+Orange+BG+1000W&font=montserrat@2x 1000w',
//       'https://placehold.co/600x300/orange/white/jpeg?text=Banner+2+Orange+BG+600W&font=montserrat@2x 600w',
//       'https://placehold.co/1000x450/orange/white/jpeg?text=Banner+2+Orange+BG+1000W&font=montserrat 1000w',
//       'https://placehold.co/600x300/orange/white/jpeg?text=Banner+2+Orange+BG+600W&font=montserrat 600w',
//     ],
//     sizes: '(max-width: 600px) 100vw, 1000px',
//     fallback:
//       'https://placehold.co/1000x450/orange/white/jpeg?text=JPEGFallbackBanner+2+Orange+BG&font=montserrat',
//     alt: 'Banner 2 with orange background and Montserrat font',
//   },
//   {
//     id: 'avif-banner-3',
//     baseUrl: 'https://placehold.co/800x400/transparent/red',
//     srcSet: [
//       'https://placehold.co/800x400/transparent/red/avif?text=Banner+3+Transparent+Red&font=poppins@3x 800w',
//       'https://placehold.co/400x200/transparent/red/avif?text=Banner+3+Transparent+Red&font=poppins@3x 400w',
//       'https://placehold.co/800x400/transparent/red/png?text=Banner+3+Transparent+Red&font=poppins 800w',
//       'https://placehold.co/400x200/transparent/red/png?text=Banner+3+Transparent+Red&font=poppins 400w',
//     ],
//     sizes: '(max-width: 600px) 100vw, 800px',
//     fallback:
//       'https://placehold.co/800x400/transparent/red/png?text=Banner+3+Transparent+Red&font=poppins',
//     alt: 'Banner 3 with transparent background and Poppins font',
//   },
// ];

const defaultProfileUrl = 'https://avatar.iran.liara.run/public/49';

export const Profile = () => {
  // Массив вариантов баннеров с разными настройками

  // Состояние для текущего баннера
  // const [currentBanner, setCurrentBanner] = useState(bannerVariants[2]);

  const [randomBannerUrl, setRandomBannerUrl] = useState(
    `https://picsum.photos/1200/500?random=${randomDefaultIndex}`
  );
  const [profileUrl, setProfileUrl] = useState(defaultProfileUrl);
  // Обработка ошибок загрузки
  const handleChangeBanner = () => {
    // Генерация случайного индекса для выбора баннера
    const randomIndex = Math.floor(Math.random() * 1000);
    // Установка нового URL баннера
    setRandomBannerUrl(`https://picsum.photos/1200/500?random=${randomIndex}`);
  };
  // Переключение баннеров
  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      console.log(fileUrl);
      setProfileUrl(fileUrl);
    }
  };

  return (
    <div className="p-2 relative">
      {/* <picture>
        <source
          srcSet={currentBanner.srcSet
            .filter(src => src.includes('avif'))
            .join(', ')}
          sizes={currentBanner.sizes}
        />
        <source
          srcSet={currentBanner.srcSet
            .filter(src => src.includes('webp'))
            .join(', ')}
          sizes={currentBanner.media}
        />
        <img
          src={currentBanner.fallback}
          srcSet={currentBanner.srcSet
            .filter(src => !src.includes('webp'))
            .join(', ')}
          sizes={currentBanner.sizes}
          alt={currentBanner.alt}
          loading="lazy"
          onError={handleImageError}
          className="w-full h-auto object-cover sm:h-64 md:h-80 lg:h-96 rounded-lg shadow-md"
        />
      </picture> */}

      <img
        src={randomBannerUrl}
        alt="Random Banner"
        className="w-full h-auto object-cover sm:h-35 md:h-40 lg:h-60 rounded-lg shadow-md"
      />

      <button
        className="block ml-auto mt-2 bg-blue-200 text-slate-800 dark:text-slate-200 dark:bg-blue-950 py-2 px-4 rounded cursor-pointer hover:bg-blue-300 transition-colors"
        onClick={handleChangeBanner}
      >
        Change Banner
      </button>
      <div className="cursor-pointer items-center bg-white p-2 max-w-fit flex gap-5">
        <div className="bg-transparent p-2 rounded-lg shadow-md max-w-fit relative ">
          <img
            src={profileUrl}
            alt="Profile"
            className="w-20 aspect-square rounded-full object-cover"
          />
          <label className="absolute bottom-[-20px] left-1/2 translate-x-[-50%] cursor-pointer shadow-2xl shadow-amber-300 hover:bg-blue-200 dark:hover:bg-blue-950 p-2 rounded-full transition-colors">
            <FaCamera size={24} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChangeProfile}
            />
          </label>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            User Name
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            This is a short description about the user. It can include some
            interesting facts or hobbies.
          </p>
          <button className="bg-red-500 mt-4 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>

      <Tabs />
    </div>
  );
};
