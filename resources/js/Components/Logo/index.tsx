import { Image } from "@mantine/core";
import logoWhite from "@/Assets/logo-white.png";
import logoBlack from "@/Assets/logo-black.png";

interface LogoProps {
  variant?: "white" | "black";
  width?: number;
}

function Logo({ variant = "black", width = 150 }: LogoProps) {
  return (
    <Image
      src={variant === "black" ? logoBlack : logoWhite}
      alt="Video PIX"
      w={width}
    />
  );
}

export default Logo;
