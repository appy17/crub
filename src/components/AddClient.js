import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillSendPlusFill } from "react-icons/bs";

export default function AddClient({disable , display}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  // Define the initial state for client data
  const [clientData, setClientData] = useState({
    name: "",
    phoneNumber: "",
    gender: "", // Store gender value
    membership: "", // Store membership value
  });

  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleDataClient = () => {
    setLoading(true);

    // Send the data as an object
    axios
      .post("http://localhost/backend/addClient.php", clientData)
      .then((response) => {
        toast({
          containerStyle: {
            zIndex: 999999999,
          },
          position: "top",
          title: "Data Added.",
          description: "Client Data added to Database",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);

        setClientData({
          name: "",
          phoneNumber: "",
          gender: "",
          membership: "",
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
      onClose();
  };

  const handleChange = (e) => {
    // Update the clientData state with the input values
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenderChange = (value) => {
    // Update the gender value when a radio button is selected
    setClientData({
      ...clientData,
      gender: value,
    });
  };

  const handleMembershipChange = (value) => {
    // Update the membership value when a radio button is selected
    setClientData({
      ...clientData,
      membership: value,
    });
  };

  useEffect(() => {
    const isFilled = Object.values(clientData).every(
      (value) => value.trim() !== ""
    );
    setIsFormFilled(isFilled);
  }, [clientData]);
  // console.log(clientData)
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <Button onClick={onOpen}variant={'solid'} display={display}
       isDisabled={disable}colorScheme='green' borderLeftRadius={'none'}>Add</Button>

    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
    <Flex  align={"center"} justify={"center"} bg={"white"} mt={0} p={10} borderRadius={'8px'}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={0} px={0}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"} color={"black"}>
            Add New Client
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Submit data in the given form ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={"whitesmoke"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <HStack>
              <FormControl id="name" isRequired>
                <FormLabel color={"gray"}>Name</FormLabel>
                <Input
                  type="text"
                  border={"1px solid gray"}
                  color={"black"}
                  focusBorderColor={"black"}
                  _hover={{ border: "1px solid " }}
                  onChange={handleChange}
                  name="name"
                  value={clientData.name}
                />
              </FormControl>

              <FormControl id="phoneNumber" isRequired>
                <FormLabel color={"gray"}>Phone Number</FormLabel>
                <Input
                  type="number"
                  border={"1px solid gray"}
                  color={"black"}
                  focusBorderColor={"black"}
                  _hover={{ border: "1px solid " }}
                  onChange={handleChange}
                  name="phoneNumber"
                  value={clientData.phoneNumber}
                />
              </FormControl>
            </HStack>

            {/* Uncomment the following sections for gender and membership selection if needed */}
             
            <FormControl id="Gender" isRequired>
              <FormLabel color={"gray"}>Select Gender</FormLabel>
              <Stack color={'gray.600'} fontWeight={'bold'}>
                <RadioGroup
                  name="gender"
                  onChange={handleGenderChange}
                  value={clientData.gender}
                >
                  {/* Radio options... */}
                  <Radio
                    size="md"
                    name="Male"
                    value="Male"
                    colorScheme="teal"
                    border={"2px solid gray"}
                  >
                    Male
                  </Radio>
                  <Radio
                    size="md"
                    name="Female"
                    value="Female"
                    colorScheme="pink"
                    border={"2px solid gray"}
                    ml={4}
                  >
                    Female
                  </Radio>
                </RadioGroup>
              </Stack>
            </FormControl>

            <FormControl id="Membership" isRequired>
              <FormLabel color={"gray"}>Select Membership</FormLabel>
              <Stack color={'gray.600'} fontWeight={'bold'}>
                <RadioGroup
                  onChange={handleMembershipChange}
                  value={clientData.membership}
                >
                  {/* Radio options... */}
                  <Radio
                    size="md"
                    name="500"
                    value="500"
                    colorScheme="yellow"
                    border={"2px solid gray"}
                  >
                    ₹500
                  </Radio>
                  <Radio
                    size="md"
                    name="1000"
                    value="1000"
                    colorScheme="orange"
                    border={"2px solid gray"}
                    ml={4}
                  >
                    ₹1000
                  </Radio>
                  <Radio
                    size="md"
                    name="Null"
                    value={'null'}
                    colorScheme="red"
                    border={"2px solid gray"}
                    ml={4}
                  >
                    None
                  </Radio>
                </RadioGroup>
              </Stack>
            </FormControl> 
            
            
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Adding"
                size="lg"
                bg={"black"}
                color={"white"}
                _hover={{
                  bg: "gray.600",
                }}
                transition={"ease-in 0.1s"}
                isLoading={loading}
                onClick={handleDataClient}
                isDisabled={!isFormFilled} 
              >
                Add Client&nbsp;&nbsp;
                <BsFillSendPlusFill />
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </ModalContent>
      </Modal>
      </>
  );
}
