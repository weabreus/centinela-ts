import { SVGProps } from "react";

interface NavLinkDataType {
  key: string;
  href: string;
  icon: SVGProps<SVGSVGElement>;
  current: boolean;
}

export default NavLinkDataType;