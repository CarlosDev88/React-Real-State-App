import { Box, Flex, Spacer, Text, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { baseUrl, fetchApi } from "../../utils/fetchApi";

import React from "react";
import ImageScrollbar from "../../components/ImageScrollbar";

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
    description,
  },
}) => {
  return (
    <Box maxWidth="1000px" margin="auto" p="4">
      {photos && <ImageScrollbar data={photos} />}
      <Box w="full" p="6">
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Box paddingRight="3" color="green">
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              USD {millify(price)}
              {rentFrequency && `/${rentFrequency}`}
            </Text>
          </Flex>
          <Box>
            <Avatar size="sm" src={agency?.logo?.url}></Avatar>
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          w="250px"
          color="blue.400"
        >
          {rooms} <FaBed /> | {baths} <FaBath /> {millify(area)} m2{" "}
          <BsGearFill />
        </Flex>
        <Box marginTop="2">
          <Text fontSize="lg" marginBottom="2" fontWeight="bold">
            {title}
          </Text>
          <Text lineHeight="2" color="gray.600">
            {description}
          </Text>
        </Box>
        <Flex
          flexWrap="wrap"
          textTransform="uppercase"
          justifyContent="space-between"
        >
          <Flex
            justifyContent="space-between"
            w="400px"
            borderBottom="1px"
            borderColor="gray.100"
            p="3"
          >
            <Text>Tipo: </Text>
            <Text fontWeight="bold">{type}</Text>
          </Flex>

          <Flex
            justifyContent="space-between"
            w="400px"
            borderBottom="1px"
            borderColor="gray.100"
            p="3"
          >
            <Text>Propocito: </Text>
            <Text fontWeight="bold">
              {purpose === "for-rent" ? "para rentar" : "para vender"}
            </Text>
          </Flex>
          {furnishingStatus && (
            <Flex
              justifyContent="space-between"
              w="400px"
              borderBottom="1px"
              borderColor="gray.100"
              p="3"
            >
              <Text>Se entrega </Text>
              <Text fontWeight="bold">
                {furnishingStatus === "furnished" ? "amoblado" : "sin amoblar"}
              </Text>
            </Flex>
          )}
        </Flex>
        <Box>
          {amenities.length && (
            <Text fontSize="2xl" fontWeight="black" marginTop="5">
              Entretenimiento:
            </Text>
          )}

          <Flex flexWrap="wrap">
            {amenities.map((item) =>
              item.amenities.map((amenity) => (
                <Text
                  fontWeight="bold"
                  color="green.400"
                  fontSize="10px"
                  p="2"
                  key={amenity.id}
                  bg="gray.200"
                  m="1"
                  borderRadius="5"
                >
                  {amenity.text}
                </Text>
              ))
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
export default PropertyDetails;
