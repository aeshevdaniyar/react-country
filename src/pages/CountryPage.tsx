import {
  Container,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Image,
  Text,
  HStack,
  Flex,
  Tag,
} from "@chakra-ui/react";
import { Countries } from "@service";
import { axiosInstance } from "../App";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { COUNTRY_URl } from "@router";
interface Translations {
  ara: Ara;
  bre: Bre;
  ces: Ces;
  cym: Cym;
  deu: Deu;
  est: Est;
  fin: Fin;
  fra: Fra;
  hrv: Hrv;
  hun: Hun;
  ita: Ita;
  jpn: Jpn;
  kor: Kor;
  nld: Nld;
  per: Per;
  pol: Pol;
  por: Por;
  rus: Rus;
  slk: Slk;
  spa: Spa;
  srp: Srp;
  swe: Swe;
  tur: Tur;
  urd: Urd;
  zho: Zho;
}

export interface Ara {
  official: string;
  common: string;
}

export interface Bre {
  official: string;
  common: string;
}

export interface Ces {
  official: string;
  common: string;
}

export interface Cym {
  official: string;
  common: string;
}

export interface Deu {
  official: string;
  common: string;
}

export interface Est {
  official: string;
  common: string;
}

export interface Fin {
  official: string;
  common: string;
}

export interface Fra {
  official: string;
  common: string;
}

export interface Hrv {
  official: string;
  common: string;
}

export interface Hun {
  official: string;
  common: string;
}

export interface Ita {
  official: string;
  common: string;
}

export interface Jpn {
  official: string;
  common: string;
}

export interface Kor {
  official: string;
  common: string;
}

export interface Nld {
  official: string;
  common: string;
}

export interface Per {
  official: string;
  common: string;
}

export interface Pol {
  official: string;
  common: string;
}

export interface Por {
  official: string;
  common: string;
}

export interface Rus {
  official: string;
  common: string;
}

export interface Slk {
  official: string;
  common: string;
}

export interface Spa {
  official: string;
  common: string;
}

export interface Srp {
  official: string;
  common: string;
}

export interface Swe {
  official: string;
  common: string;
}

export interface Tur {
  official: string;
  common: string;
}

export interface Urd {
  official: string;
  common: string;
}

export interface Zho {
  official: string;
  common: string;
}
interface CardProps {
  flags: {
    png: string;
    alt: string;
    svg: string;
  };
  name: {
    common: string;
  };
  capital: string[];
  population: number;
  area: number;
  translations: Translations;
  cioc: string;
  languages: Record<string, string>;
  borders: string[];
}
const CountryPage = () => {
  const params = useParams();
  const [country, setCountry] = useState<CardProps>();
  const navigate = useNavigate();
  const countriesService = new Countries(axiosInstance);

  console.log(country?.borders);

  useEffect(() => {
    countriesService.getCountryByCode(params.name).then((data) => {
      setCountry(data[0]);
    });
  }, []);
  useEffect(() => {
    countriesService.getCountryByCode(params.name).then((data) => {
      setCountry(data[0]);
    });
  }, [params.name]);

  return (
    <Container p={6} maxW="8xl">
      <Button colorScheme="blue" onClick={() => navigate(-1)}>
        Назад
      </Button>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        mt={6}
      >
        <Image
          objectFit="cover"
          maxW={"50%"}
          src={country && country.flags && country.flags.svg}
          alt="Caffe Latte"
        />

        <CardBody>
          <Stack>
            <Text
              color={"gray.500"}
              fontWeight={600}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              Название:{" "}
              {country &&
                country.translations &&
                country.translations.rus.common}
            </Text>

            <HStack spacing={2} alignItems="flex-start">
              <Text
                color={"gray.500"}
                fontWeight={600}
                fontSize={"sm"}
                textTransform={"uppercase"}
              >
                {" "}
                Столица:
              </Text>
              {country && country.capital && (
                <Flex flexWrap="wrap" gap={2}>
                  {country.capital.map((name) => {
                    return (
                      <Tag variant="outline" key={name} colorScheme="blue">
                        {name}
                      </Tag>
                    );
                  })}
                </Flex>
              )}
            </HStack>

            <Text
              color={"gray.500"}
              fontWeight={600}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              Население : {country && country.population} людей
            </Text>
            <Text
              color={"gray.500"}
              fontWeight={600}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              Площадь : {country && country.area}
            </Text>
            <Text
              color={"gray.500"}
              fontWeight={600}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              Код страны : {country && country.cioc}
            </Text>

            <HStack spacing={2} alignItems="flex-start">
              <Text
                color={"gray.500"}
                fontWeight={600}
                fontSize={"sm"}
                textTransform={"uppercase"}
              >
                Языки:
              </Text>
              {country &&
                country.languages &&
                Object.values(country && country.languages) && (
                  <Flex flexWrap="wrap" gap={2}>
                    {Object.values(country.languages).map((name) => {
                      return (
                        <Tag variant="outline" key={name} colorScheme="blue">
                          {name}
                        </Tag>
                      );
                    })}
                  </Flex>
                )}
            </HStack>
            <HStack spacing={2} alignItems="flex-start">
              <Text
                color={"gray.500"}
                fontWeight={600}
                fontSize={"sm"}
                textTransform={"uppercase"}
              >
                Граничит:
              </Text>
              {country &&
                country.borders &&
                country.borders.map((name) => {
                  return (
                    <Tag
                      as={Link}
                      to={COUNTRY_URl + "/" + name}
                      variant="outline"
                      key={name}
                      colorScheme="blue"
                    >
                      {name}
                    </Tag>
                  );
                })}
            </HStack>
          </Stack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default CountryPage;
