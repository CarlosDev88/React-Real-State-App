import { useContext } from "react";
import Image from "next/image";
import { Box, Icon, Flex } from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowAltCircleLeft}
        disabled={isFirstItemVisible}
        onClick={() => scrollPrev()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowAltCircleRight}
        disabled={isLastItemVisible}
        onClick={() => scrollNext()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  );
};

export default function ImageScrollbar({ data }) {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overflow: "hiden" }}
    >
      {data.map((image) => {
        return (
          <Box
            key={image.id}
            width="910px"
            itemID={image.id}
            overflow="hidden"
            p="1"
          >
            <Image
              alt="property"
              placeholder="blur"
              blurDataURL={image.url}
              src={image.url}
              width={1000}
              height={500}
              sizes="(max-width:500px) 100px, (max-width):1024px 400px, 1000px"
            />
          </Box>
        );
      })}
    </ScrollMenu>
  );
}
