import type { FC } from 'react';

interface CardProps {
  title: string;
  description: string;
  image: string;
  link?: string;
}
export const Card: FC<CardProps> = ({
  title,
  description,
  image,
  link = '#',
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg  hover:shadow-lg transition-shadow duration-300">
      <div className="overflow-hidden rounded-t-[inherit] ">
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-contain  mb-2 rounded-[inherit] hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <a
          href={link}
          className="mt-2 inline-block text-blue-600 hover:underline"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};
