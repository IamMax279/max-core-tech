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
    <>
      <Image
        src={src}
        alt={alt}
        width={414}
        height={275}
        className={`object-cover ${className} hidden sm:flex`}
        onClick={onClick}
      />
      <div className="relative h-[275px] w-full sm:hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${className}`}
          onClick={onClick}
        />
      </div>
    </>
  );
}