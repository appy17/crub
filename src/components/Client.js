import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  VStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  HStack,
  Button,
  Divider,
  Flex,
  useDisclosure,
  Tag,
  TagLabel,
  Toast,
  useToast,
  FormControl,
  RadioGroup,
  Stack,
  Radio,
  FormLabel,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import axios from "axios";
import { ImFilter } from "react-icons/im";
import { GrSettingsOption } from "react-icons/gr";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { easeIn } from "framer-motion";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose,
  } = useDisclosure();
  // const {} = useDisclosure()
 


  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    "500_membership": false,
    "1000_membership": false,
  });
  const [clientId, setClientId] = useState("");
  const [disabledDelete, setDisabledDelete] = useState(true);
  const [updateName, setUpdateName] = useState("");
  const [updateNumber, setUpdateNumber] = useState("");
  const [updateMembership, setUpdateMembership] = useState("");
  const [updateGender, setUpdateGender] = useState("");
  // const [displayText , setdisplayText] = useState('none');
// update client fucntion 
// const [clientData, setClientData] = useState({
//   name: "",
//   phoneNumber: "",
//   gender: "", // Store gender value
//   membership: "", // Store membership value
// });
const handleUpdate = async () => {
  const updatedData = {
    name: updateName,
    phoneNumber: updateNumber,
    gender: updateGender,
    membership: updateMembership,
  };
   console.log(clientId , updatedData);
  axios
    .post("http://localhost/backend/updateClient.php", {
      clientId: Number(clientId),
      ...updatedData,
    })
    .then((response) => {
      toast({
        containerStyle: {
          zIndex: 999999999,
        },
        position: "top",
        title: "Data Updated.",
        description: "Client Data added to Database",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
      loadData();
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });

  onSecondModalClose();
  setClientId("");
  setUpdateName("");
  setUpdateNumber("");
  setUpdateMembership("");
  setUpdateGender("");
};

  const toast = useToast();
  const loadData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/backend/getClientData.php"
      );
      const data = response.data.phpresult;
      setData(data);
      //   console.log(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  const handleClientIdChange = (event) => {
    const newClientId = event.target.value;
    setClientId(newClientId);

    // Check if the entered client ID is empty
    if (event.target.value === "") {
      setDisabledDelete(true);
    } else {
      setDisabledDelete(false);
      // setClientId("");1
  setUpdateName("");
  setUpdateNumber("");
  setUpdateMembership("");
  setUpdateGender("");
    }
  };

  const handleDelete = async () => {

    try {
      // Perform the deletion logic here, using the clientId state
      console.log(clientId);
      await axios
        .post("http://localhost/backend/deleteClient.php", {
          clientId: Number(clientId),
        })
        .then((response) => {
          onClose();
          setClientId("");

          toast({
            containerStyle: {
              zIndex: 999999999,
            },
            position: "top",
            title: "Data Deleted !",
            description: "Client Data Deleted Succesfully !",
            status: "error",
            duration: 9000,
            isClosable: true,
          }); // Close the modal after successful deletion
          console.log(response);
          loadData();
          setDisabledDelete(true);
        });
      // edge case need to be added
    } catch (error) {
      console.error("Error deleting client:", error);
      // Handle error or show a notification to the user
    }
  };

  useEffect(() => {
    setFilteredData(
      data
        .filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.mobile_number.includes(searchTerm)
        )
        .filter((user) => {
          return (
            (!filterOptions["500_membership"] || user.membership === "500") &&
            (!filterOptions["1000_membership"] || user.membership === "1000")
          );
        })
        .filter((user) => {
          if (!selectedDate) return true;
          const userDate = (
            user.last_visit == null ? "2023-01-01 " : user.last_visit
          ).split(" ")[0];
          return userDate === selectedDate;
        })
    );
    const maleCountFiltered = filteredData.filter(
      (user) => user.gender === "Male"
    ).length;
    const femaleCountFiltered = filteredData.filter(
      (user) => user.gender === "Female"
    ).length;
    const totalRevenueFiltered = filteredData.reduce(
      (total, user) => total + Number(user.amount),
      0
    );

    setCounts({
      male: maleCountFiltered,
      female: femaleCountFiltered,
      revenue: totalRevenueFiltered,
    });
  }, [data, searchTerm, selectedDate, filterOptions]);

  const [counts, setCounts] = useState({
    male: 0,
    female: 0,
    revenue: 0,
  });

  const openFilterModal = () => {
    setFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setFilterModalOpen(false);
  };

  const applyFilters = () => {
    setFilterModalOpen(false);
  };
  // const matchingUser = filteredData.find((user) => user.id === Number(clientId));

  // const isUpdateDisabled = !matchingUser || Object.values(updateData).some((value) => value === '');
  return (
    <Center h="auto">
      <VStack spacing={4} align="start" w="80%" mt={2}>
        <HStack spacing={4} w="100%">
          {/* <FormControl isRequired> */}
          <Input
            type="text"
            placeholder="Search by username or mobile number"
            value={searchTerm}
            w={"80%"}
            onChange={(e) => setSearchTerm(e.target.value)}
            border={"1px solid black"}
            _placeholder={{ color: "gray" }}
            _hover={{ border: "1px solid black" }}
            color={"black"}
          />
          {/* </FormControl> */}
          <Button
            colorScheme="blue"
            onClick={openFilterModal}
            rightIcon={<ImFilter />}
          >
            Filter
          </Button>
          {/* <Button colorScheme="teal" onClick={openFilterModal} rightIcon={<GrSettingsOption/>}>
            Action
          </Button> */}
          <Popover isLazy>
            <PopoverTrigger>
              <Button colorScheme="teal" rightIcon={<GrSettingsOption />}>
                Actions
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton color={"green.300"} />

              <PopoverHeader>Update or Delete Information </PopoverHeader>
              <PopoverBody>
                <Button colorScheme="purple" mr={3} onClick={onSecondModalOpen}>
                  <AiFillEdit />
                </Button>
                <Button colorScheme="red" onClick={onOpen}>
                  <AiFillDelete />
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          {/* Delete Modal */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent p={2}>
              <ModalHeader color={"red.400"}>Delete Client</ModalHeader>
              <FormControl isRequired>
                <Input
                  placeholder="Enter Valid ClientId or User Id"
                  type="number"
                  border={"1px solid gray"}
                  focusBorderColor="red.300"
                  w={"100%"}
                  value={clientId}
                  onChange={handleClientIdChange}
                  //  right={'text'}
                  isRequired
                  borderBottomRadius={"none"}
                />
              </FormControl>
              {filteredData.map((user) => (
                <Tag
                  key={user.id}
                  // ml={4}
                  fontSize={"medium"}
                  color="whitesmoke"
                  bg={"gray"}
                  // borderRadius={'10px'}
                  display={user.id === clientId ? "block" : "none"}
                  p={3}
                  opacity={0.7}
                  transition={"ease-in 1s"}
                  borderTopRadius={"none"}
                >
                  <TagLabel>
                    <span style={{ color: "lime" }}>{user.name}</span>'s Data
                    will be Deleted !
                  </TagLabel>
                </Tag>
              ))}

              <ModalCloseButton />
              <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={handleDelete}
                  isDisabled={disabledDelete}
                >
                  <AiFillDelete />
                </Button>
                {/* <Button variant='ghost'>Secondary Action</Button> */}
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/*  */}
          {/* Update Modal Form */}
          <Modal isOpen={isSecondModalOpen} onClose={onSecondModalClose}>
            <ModalOverlay />
            <ModalContent p={2}>
              <ModalHeader color={"purple.400"}>Update Information</ModalHeader>
              <FormControl isRequired>
                <Input
                  placeholder="Enter Valid ClientId or User Id"
                  type="number"
                  border={"1px solid gray"}
                  focusBorderColor="purple.300"
                  w={"100%"}
                  value={clientId}
                  onChange={handleClientIdChange}
                  isRequired
                />
              </FormControl>
              {filteredData.map((user) => (
                <Tag
                  key={user.id}
                  fontSize={"medium"}
                  color="whitesmoke"
                  bg={"gray"}
                  display={user.id === clientId ? "block" : "none"}
                  p={3}
                  opacity={0.7}
                  transition={"ease-in 1s"}
                >
                  <TagLabel>
                    <span style={{ color: "lime" }}>{user.name}</span>'s Data
                    Will be manipulated!
                  </TagLabel>
                </Tag>
              ))}
              {/* Form */}
              {filteredData.map((user) => (
                
                <FormControl display={user.id == clientId ? "block" : "none"}>
                  <Input
                    placeholder="Update Name"
                    type="text"
                    border={"1px solid gray"}
                    focusBorderColor="purple.300"
                    w={"100%"}
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                    isRequired
                    mt={2}
                  />
                  <Input
                    placeholder="Update Mobile number"
                    type="number"
                    border={"1px solid gray"}
                    focusBorderColor="purple.300"
                    w={"100%"}
                    value={updateNumber}
                    onChange={(e) => setUpdateNumber(e.target.value)}
                    isRequired
                    mt={2}
                    // isDisabled={!matchingUser}
                  />
                   <FormLabel 
                    mt={3}
                    color={"gray"}
                    textAlign={'center'}>Update Membership</FormLabel>
                  <RadioGroup
                    mt={2}
                    onChange={(value) => setUpdateMembership(value)}
                    value={updateMembership}
                    //  isDisabled={matchingUser ? false : true}
                  >
                    <Stack direction='column'>
                      <Radio value="500">500 Membership</Radio>
                      <Radio value="1000">1000 Membership</Radio>
                      <Radio value={'Null'} >None</Radio>
                    </Stack>
                  </RadioGroup>
                  <Tag
                    placeholder="Membership"
                    type="number"
                    border={"1px solid gray"}
                    focusBorderColor="purple.300"
                    w={'fit-content'}
                    value={updateMembership}
                    onChange={(e) => setUpdateMembership(e.target.value)}
                    isRequired
                    mt={2}
                    pointerEvents={"none"}
                    bg={"transparent"}
                    opacity={0.7}
                  >
                    {" "}
                    {updateMembership}
                  </Tag>
                  <FormLabel 
                    mt={3}
                    color={"gray"} textAlign={'center'}>Update Gender</FormLabel>
                   
                   
                  <RadioGroup
                    mt={2}
                    onChange={(value) => setUpdateGender(value)}
                    value={updateGender}
                    // isDisabled={matchingUser ? false : true}
                  >
                    <Stack direction="row">
                      <Radio value="Male">Male</Radio>
                      <Radio value="Female">Female</Radio>
                    </Stack>
                  </RadioGroup>
                  <Tag
                    placeholder="Gender"
                    type="text"
                    border={"1px solid gray"}
                    focusBorderColor="purple.300"
                    w={'fit-content'}
                    value={updateGender}
                    onChange={(e) => setUpdateGender(e.target.value)}
                    isRequired
                    mt={2}
                    pointerEvents={"none"}
                    bg={"transparent"}
                    opacity={0.7}
                  >
                    {updateGender}
                  </Tag>
                </FormControl>
              ))}
              <ModalCloseButton />
              <ModalBody></ModalBody>
              <ModalFooter>
              <Button
  colorScheme="purple"
  mr={3}
  isDisabled={disabledDelete}
  rightIcon={<AiFillEdit />}
  onClick={handleUpdate}
>
  Update
</Button>
              </ModalFooter>
              
            </ModalContent>
          </Modal>
          {/* Update Modal */}
        </HStack>
        <Center>
          <Box
            display="flex"
            padding={6}
            borderRight="2px solid teal"
            borderLeft="2px solid teal"
            borderRadius="8px"
            alignItems="center"
            justifyContent="center"
            mx={"auto"}
          >
            <Text fontWeight="bold" color="black">
              Male: {counts.male}
            </Text>
            <Divider orientation="vertical" height="20px" mx="4" />
            <Text fontWeight="bold" color="black">
              Female: {counts.female}
            </Text>
            <Divider orientation="vertical" height="20px" mx="4" />
            <Text fontWeight="bold" color="black">
              Total Revenue: {"₹" + counts.revenue}
            </Text>
          </Box>
        </Center>
        <Table
          variant="simple"
          size="lg"
          borderWidth="1px"
          borderColor="gray.300"
          borderRadius="md"
        >
          <Thead>
            <Tr>
              <Th>UserID</Th>
              <Th>User Name</Th>
              <Th>Mobile No.</Th>
              <Th>Amount</Th>
              <Th>Last Visit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((user) => (
              <Tr key={user.id}>
                <Td color="black">C{user.id}</Td>
                <Td color="black">{user.name}</Td>
                <Td color="black">{user.mobile_number}</Td>
                <Td color="black">{"₹" + Number(user.amount)}</Td>
                <Td color="black">
                  {user.last_visit ? user.last_visit : "2023-01-01"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
      <Modal isOpen={filterModalOpen} onClose={closeFilterModal}>
        <ModalOverlay
          bg="whiteAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Filter Users by Membership</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Checkbox
              mr={4}
              isChecked={filterOptions["500_membership"]}
              onChange={() =>
                setFilterOptions({
                  ...filterOptions,
                  "500_membership": !filterOptions["500_membership"],
                })
              }
            >
              500 Membership
            </Checkbox>
            <Checkbox
              isChecked={filterOptions["1000_membership"]}
              onChange={() =>
                setFilterOptions({
                  ...filterOptions,
                  "1000_membership": !filterOptions["1000_membership"],
                })
              }
            >
              1000 Membership
            </Checkbox>
            <Text>Date:</Text>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={applyFilters}>
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default App;
