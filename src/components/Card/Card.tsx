import {
  Center,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  Text,
  Image,
  Badge,
  HStack,
  Tag,
  TagLabel,
  TagRightIcon,
  Flex,
  Button,
  LinkBox,
} from "@chakra-ui/react";
import { COUNTRY_URl } from "@router";
import { LocalStorage } from "@service";
import { FC } from "react";
import { Link } from "react-router-dom";

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
  country: {
    flags: {
      png: string;
      alt: string;
      svg: string;
    };
    name: {
      common: string;
    };
    translations: Translations;
    capital: string[];
    population: number;
    area: number;
    cioc: string;
    cca2: string;
    ccn3: number;
    languages: Record<string, string>;
  };
  favorites?: boolean;
  onAdd: (country: any) => void;
  onRemove: (name: string) => void;
}

const Card: FC<CardProps> = (props) => {
  const {
    country: {
      flags,
      translations,
      capital,
      population,
      area,
      cioc,
      ccn3,
      languages,
    },
    favorites = false,
    onAdd,
    onRemove,
  } = props;

  return (
    <LinkBox
      role={"group"}
      as={Link}
      to={COUNTRY_URl + "/" + ccn3}
      p={6}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
    >
      <Image
        rounded={"lg"}
        height="auto"
        width={"full"}
        objectFit={"cover"}
        alt={flags.alt && flags.alt}
        src={flags.svg && flags.svg}
      />

      <Stack pt={10}>
        <Text
          color={"gray.500"}
          fontWeight={600}
          fontSize={"sm"}
          textTransform={"uppercase"}
        >
          Название: {translations.rus.common && translations.rus.common}
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
          {capital && (
            <Flex flexWrap="wrap" gap={2}>
              {capital.map((name) => {
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
          Население : {population} людей
        </Text>
        <Text
          color={"gray.500"}
          fontWeight={600}
          fontSize={"sm"}
          textTransform={"uppercase"}
        >
          Площадь : {area}
        </Text>
        <Text
          color={"gray.500"}
          fontWeight={600}
          fontSize={"sm"}
          textTransform={"uppercase"}
        >
          Код страны : {cioc}
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
          {languages && Object.values(languages) && (
            <Flex flexWrap="wrap" gap={2}>
              {Object.values(languages).map((name) => {
                return (
                  <Tag variant="outline" key={name} colorScheme="blue">
                    {name}
                  </Tag>
                );
              })}
            </Flex>
          )}
        </HStack>

        {!favorites ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onAdd(props.country);
            }}
            w="full"
            bg="blue.300"
            colorScheme="blue"
          >
            В избранное
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onRemove(translations.rus.common);
            }}
            w="full"
            bg="red.500"
            colorScheme="red"
          >
            Удалить из избранных
          </Button>
        )}
      </Stack>
    </LinkBox>
  );
};

export default Card;
