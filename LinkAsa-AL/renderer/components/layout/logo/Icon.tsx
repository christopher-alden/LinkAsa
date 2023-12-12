import Link from "next/link";
import { styled, Box } from "@mui/material";
import Image from "next/image";
import myIcon from "../../../public/images/LinkAsa_Icon.png"
import Typography from "@mui/material/Typography"

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <Box sx={{userSelect:"none",display:"flex", justifyContent:"left", alignItems:"center", py:3}}>
      <Typography variant="h4" sx={{fontWeight:"600"}}>LINK</Typography>
      <Image src={myIcon} alt="logo" height={40} width={40} priority />
      <Typography variant="h4" sx={{fontWeight:"600"}}>SA</Typography>
    </Box>
  );
};

export default Logo;
