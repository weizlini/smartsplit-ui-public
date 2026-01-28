import { useMediaQuery } from "react-responsive";

const useScreenSizes = () => {
  const isXLarge = useMediaQuery({ query: "(min-width: 1200px)" });
  const isLarge = useMediaQuery({
    query: "(min-width: 992px) and (max-width:1199px)",
  });
  const isMed = useMediaQuery({
    query: "(min-width: 768px) and (max-width:991px)",
  });
  const isSmall = useMediaQuery({
    query: "(min-width: 576px) and (max-width:767px)",
  });
  const isXSmall = useMediaQuery({
    query: "(max-width:557px)",
  });
  const medOrLess = isMed || isSmall || isXSmall;
  return {
    isXSmall,
    isSmall,
    isMed,
    isLarge,
    isXLarge,
    medOrLess,
  };
};
export default useScreenSizes;
