import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";
import myLogo from "../../../public/images/LinkAsa_Logo.png"

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <Image src={myLogo} alt="logo" height={90} width={100} priority />
  );
};

export default Logo;
