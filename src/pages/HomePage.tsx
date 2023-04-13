import {
  Stack,
  Flex,
  Input,
  Button,
  Container,
  Box,
} from "@chakra-ui/react";
import { axiosInstance } from "../App";
import { useState, useEffect } from "react";
import { Countries } from "@service";

const HomePage = () => {
  const [search, setSearch] = useState<string>("");
  const [regions, setRegions] = useState<string[]>([]);
  const [currentRegion, setCurrentRegion] = useState<string>("");

  const countriesService = new Countries(axiosInstance);

  useEffect(() => {
    try {
      countriesService.getRegions().then((regions) => {
        setRegions(regions);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  function onSearch() {
    if (search) {
      countriesService.getCountriesByName(search);
    }
  }

  function onRegionChange(region: string) {
    setCurrentRegion(region);
    countriesService.getCountriesByRegion(region);
  }

  return (
    <Box p={12}>
      <Container maxW={"7xl"}>
        <Stack spacing={4}>
          <Flex gap={4} wrap="wrap">
            {regions.length &&
              regions.map((region) => (
                <Button
                  isActive={currentRegion == region}
                  onClick={() => onRegionChange(region)}
                >
                  {region}
                </Button>
              ))}
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
      </Container>
    </Box>
  );
};

export default HomePage;
