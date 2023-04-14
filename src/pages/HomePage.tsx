import {
  Stack,
  Flex,
  Input,
  Button,
  Container,
  Box,
  Text,
  Skeleton,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { axiosInstance } from "../App";
import { useState, useEffect } from "react";
import { Countries, LocalStorage } from "@service";
import { Card } from "@components";
import { Link } from "react-router-dom";
import { FAVORITE_URL } from "@router";

const HomePage = () => {
  const [search, setSearch] = useState<string>("");
  const [regions, setRegions] = useState<string[]>([]);
  const [currentRegion, setCurrentRegion] = useState<string>("");

  const countriesService = new Countries(axiosInstance);
  const storageService = new LocalStorage("countries");
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    try {
      countriesService.getRegions().then((regions) => {
        setRegions(regions);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (currentRegion) {
      try {
        countriesService
          .getCountriesByRegion(currentRegion.toLocaleLowerCase())
          .then((countries) => {
            setCountries(countries);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, [currentRegion]);

  function onSearch() {
    if (search) {
      setCurrentRegion("");
      countriesService.getCountriesByName(search).then((countries) => {
        setCountries(countries);
      });
    }
  }

  function onRegionChange(region: string) {
    setCurrentRegion(region);
  }
  
  function onAdd(country: any) {
    storageService.push(country);
  }

  function onRemove(name: string) {
    storageService.delete(name);
  }

  return (
    <Box p={12}>
      <Container maxW={"7xl"}>
        <Stack spacing={4}>
          <Flex gap={4} wrap="wrap">
            {regions.length ? (
              regions.map((region) => (
                <Button
                  isActive={currentRegion == region}
                  onClick={() => onRegionChange(region)}
                  key={region}
                >
                  {region}
                </Button>
              ))
            ) : (
              <Flex gap={6}>
                <Skeleton w="32" h="40px"></Skeleton>
                <Skeleton w="32" h="40px"></Skeleton>
                <Skeleton w="32" h="40px"></Skeleton>
                <Skeleton w="32" h="40px"></Skeleton>
                <Skeleton w="32" h="40px"></Skeleton>
              </Flex>
            )}
          </Flex>
          <Flex align={"center"} gap="6">
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Поиск"
              size="lg"
            />

            <Button
              colorScheme={"blue"}
              bg={"blue.400"}
              onClick={onSearch}
              px={6}
              _hover={{
                bg: "blue.500",
              }}
            >
              Поиск
            </Button>
          </Flex>
        </Stack>

        <Grid
          mt={12}
          gap={6}
          gridTemplateColumns="repeat(auto-fit, minmax(375px, 1fr))"
        >
          {countries.length ? (
            countries.map((country) => (
              <GridItem key={country.name.common}>
                <Card onAdd={onAdd} onRemove={onRemove} country={country} />
              </GridItem>
            ))
          ) : (
            <Text
              color={"gray.500"}
              fontWeight={600}
              fontSize="6xl"
              textTransform={"uppercase"}
              mt={12}
            >
              Result {countries.length}
            </Text>
          )}
        </Grid>
      </Container>
      <Button
        as={Link}
        to={FAVORITE_URL}
        position="fixed"
        bottom={12}
        left={6}
        colorScheme="blue"
        zIndex={99}
      >
        Избранные страны
      </Button>
    </Box>
  );
};

export default HomePage;
