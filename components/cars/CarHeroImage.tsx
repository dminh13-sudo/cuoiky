"use client";

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
};

export default function CarHeroImage({ src, alt, className }: Props) {
  const safeSrc = src && src.trim().length > 0 ? src : "/car-placeholder.svg";

  return (
    <img
      src={safeSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/car-placeholder.svg";
      }}
    />
  );
}

