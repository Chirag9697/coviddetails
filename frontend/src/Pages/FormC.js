import React from "react";

import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  SimpleGrid,
  GridItem,
  Button,
  Select,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";

const FormC = () => {
  const dispatch = useDispatch;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch();
  };
  return (
    <form>
      <VStack w="full" h="full" p={10} spacing={10} align="flex-start">
        <VStack spacing={2} align="flex-start">
          <Heading>Health Status</Heading>
        </VStack>
        <SimpleGrid columns={2} columnGap={3} rowGap={3}>
          <GridItem colSpan={1}>
            <FormControl isRequired>
              <FormLabel>Covid Status</FormLabel>
              <Select>
                <option> Positive</option>
                <option> Negative</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem colSpan={1}>
            <FormControl isRequired>
              <FormLabel>Vaccine Status</FormLabel>
              <Select>
                <option> Positive</option>
                <option> Negative</option>
              </Select>
            </FormControl>
          </GridItem>

          <FormControl isRequired>
            <FormLabel alignSelf="flex-start">
              Quarantine for 15 days if covid infected
            </FormLabel>
            <Select>
              <option> Yes</option>
              <option> No</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel alignSelf="flex-start">
              If infected before, mention when was it
            </FormLabel>
            <Input type="phone" placeholder="Enter your phone number" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel alignSelf="flex-start">
              Appointment if necessary
            </FormLabel>
            <Input
              sx={{ width: "800px" }}
              type="phone"
              placeholder="Enter your email address"
            />
          </FormControl>
        </SimpleGrid>
        <Button onSubmit={handleSubmit} type="submit" colorScheme="blue">
          Submit
        </Button>
      </VStack>
    </form>
  );
};

export default FormC;
