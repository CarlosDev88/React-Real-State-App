import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import Image from "next/image";
import noResult from "../assets/images/noresult.svg";
import Property from "../components/Property";
import SearchFilters from "../components/SearchFilters";
import { baseUrl, fetchApi } from "../utils/fetchApi";

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilter) => !prevFilter)}
      >
        <Text>Buscar Propiedad Por Filtros</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Propiedades{" "}
        {router.query.purpose === "for-rent" ? "para rentar" : "para vender"}
      </Text>
      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image alt="no results" src={noResult} />
          <Text fontSize="2xl" marginTop="3">
            No ay Resultados de la Busqueda
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent",
    rentFrequency = query.rentFrequency || "yearly",
    minPrice = query.minPrice || "0",
    maxPrice = query.maxPrice || "1000000",
    roomsMin = query.roomsMin || "0",
    bathsMin = query.bathsMin || "0",
    sort = query.sort || "price-desc",
    areaMax = query.areaMax || "35000",
    locationExternalIDs = query.locationExternalIDs || "5002",
    categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
