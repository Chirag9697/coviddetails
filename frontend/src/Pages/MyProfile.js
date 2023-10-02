import {
  FormControl,
  FormLabel,
  GridItem,
  HStack,
  Heading,
  Input,
  RadioGroup,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const MyProfile = () => {
  return (
    <VStack w="full" h="full" p={10} spacing={10} align="flex-start">
      <VStack spacing={2} align="flex-start">
        <Heading color="var(--chakra-colors-blue-500);">Your Details</Heading>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={3}>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Full name</FormLabel>
            <span color="red">Basanta </span>
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Group</FormLabel>
            <span>Acharya</span>
          </FormControl>
        </GridItem>

        <FormControl>
          <FormLabel alignSelf="flex-start">Address</FormLabel>
          <span>Tokha-11</span>
        </FormControl>

        <FormControl>
          <FormLabel alignSelf="flex-start">Phone Number</FormLabel>
          <span>9863551274</span>
        </FormControl>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup defaultValue="Itachi">
            <HStack spacing="24px"></HStack>
            <span>Male</span>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Date Of Birth</FormLabel>
          <span>2003/04/22</span>
        </FormControl>
        <FormControl>
          <FormLabel alignSelf="flex-start">Email</FormLabel>
          <span>acharyabasanta36@gmail.com</span>
        </FormControl>
      </SimpleGrid>
    </VStack>
  );
};

export default MyProfile;
