import { GridItem, Text, Grid, Container, Button } from "@chakra-ui/react";
import { Card } from "@components";

import { LocalStorage } from "@service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FavoritePage = () => {
  const storageService = new LocalStorage("countries");
  const [countries, setCountries] = useState<any[]>(storageService.get());

  const navigate = useNavigate();

  function onAdd(country: any) {
    storageService.push(country);
    setCountries(storageService.get());
  }

  function onRemove(name: string) {
    storageService.delete(name);
    setCountries(storageService.get());
  }
  

  return (
    <Container p={6} maxW="8xl">
      <Button colorScheme="blue" onClick={() => navigate(-1)}>
        Назад
      </Button>
      <Grid
        mt={12}
        gap={6}
        gridTemplateColumns="repeat(auto-fit, minmax(375px, 1fr))"
      >
        {countries.length ? (
          countries.map((country) => (
            <GridItem key={country.name.common}>
              <Card
                onAdd={onAdd}
                onRemove={onRemove}
                favorites
                country={country}
              />
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
  );
};

export default FavoritePage;
