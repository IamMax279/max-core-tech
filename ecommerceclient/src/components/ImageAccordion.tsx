import Image from "next/image";
import { StaticImageData } from "next/image";

interface AccordionImageProps {
  src: StaticImageData;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export default function AccordionImage({ src, alt, className = "", onClick }: AccordionImageProps) {
  return (
    <div className="relative h-[275px] w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        onClick={onClick}
      />
    </div>
  );
}