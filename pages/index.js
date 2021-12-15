import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import Property from "../components/Property";

const Banner = ({
  purpose,
  imageUrl,
  title1,
  title2,
  description1,
  description2,
  linkName,
  buttonText,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={550} height={350} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
        {description1} <br /> {description2}
      </Text>
      <Button fontSize="xl" bg="blue.400" color="white">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home({ propertiesFoSale, propertiesForRent }) {
  return (
    <Box>
      <Banner
        purpose="Alquila una propiedad"
        title1="Renta de propiedades de"
        title2="todo tipo"
        description1="Apartamentos, Cabañas, Casas"
        description2="y mucho mas"
        buttonText="Alquilar"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />

      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>

      <Banner
        purpose="Comprar una propiedad"
        title1="Encuentra la casa "
        title2="de tus sueños"
        description1="Apartamentos, Cabañas, Casas"
        description2="y mucho mas"
        buttonText="Comprar"
        linkName="/search?purpose=for-sale"
        imageUrl="https://media-cdn.tripadvisor.com/media/photo-s/15/35/2f/a0/orchid-homes.jpg"
      />

      <Flex flexWrap="wrap">
        {propertiesFoSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps(context) {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=9`
  );

  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=9`
  );

  return {
    props: {
      propertiesFoSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
