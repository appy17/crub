import {
  Box,
  Button,
  Center,
  Checkbox,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
  Stack,
  Table,
  Tag,
  TagCloseButton,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SlCalender } from "react-icons/sl";
import { IoClose } from "react-icons/io5";
import { FaSort } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "./context/AppContext";
export default function Invoice() {
  const [displatS, setdisplayS] = useState("none");
  const [display2, setdisplay2] = useState("none");
  const [display3, setdisplay3] = useState("none");

  const location = useLocation();
  const [service, setService] = useState(null);
  const [search, setSearch] = useState("");
  const [Cname, setCname] = useState("client_name");
  // console.log(location.pathname);
  const dbpath1 = "http://localhost/backend/";
  const [servicedata, setServiceData] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const handleCheckboxChange = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
      setSelectedServices((prevSelected) =>
        prevSelected.filter((service) => service !== serviceName)
      );
    } else {
      setSelectedServices((prevSelected) => [...prevSelected, serviceName]);
    }
  };
  const handleRemoveService = (serviceName) => {
    setSelectedServices((prevSelected) =>
      prevSelected.filter((service) => service !== serviceName)
    );
  };
  const [selectedType, setSelectedType] = useState("perc");
  const [percentageValue, setPercentageValue] = useState("");
  const [flatValue, setFlatValue] = useState("");

  const handleTypeChange = (value) => {
    setSelectedType(value);
    setFlatValue("");
    setPercentageValue("");
  };

  // const handleInputChange = (e) => {
  //   const inputValue = e.target.value;

  //   if (selectedType === "perc") {
  //     setPercentageValue(inputValue);
  //   } else {
  //     setFlatValue(inputValue);
  //   }
  // };
  const loadServiceData = async () => {
    try {
      const response = await axios.get(dbpath1 + "getServicedata.php");
      const Servicedata = response.data.phpresult;
      setServiceData(Servicedata);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    loadServiceData(); // Call the loadData function when the component mounts
  }, []);
  const [Clientdata, setClinetData] = useState([]);

  const loadCData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/backend/getClientData.php"
      );
      const data = response.data.phpresult;
      setClinetData(data);
      // console.log(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    loadCData();
  }, []);
  // console.log(Clientdata);
  const [suggestions, setSuggestions] = useState([]);
  const filterClient = (e) => {
    // Check if the event object is provided
    if (e && e.target) {
      const inputValue = e.target.value;
      setSearch(inputValue);
      // console.log("Input Value: " + inputValue);
      setdisplay3("block");
    }
    //   const filteredSuggestions = Clientdata.filter((data) =>
    //   data.mobile_number.toLowerCase().includes(client.toLowerCase())
    // );
    const filteredSuggestions = Clientdata.filter(
      (data) =>
        data.mobile_number.includes(search) ||
        data.name.toLowerCase().includes(search.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };
  useEffect(() => {
    filterClient();
  }, [search]);
  const handleSuggestionClick = (name, number) => {
    // Handle suggestion click, set the selected client, and clear suggestions
    setSuggestions([]);
    setSearch(number);
    setCname(name);
    setdisplay3("none");

    // let m = true;
  };

  const PaymentMode = [
    "CASH",
    "CARD",
    "ONLINE",
    "G Pay",
    "PhonePe",
    "UPI",
    "Cheque",
  ];
  const handleItemClick = (item) => {
    setService(item);
  };
  let totalFinal = 0;
  let totalFinal2 = 0;
  // let gst = (totalFinal2*9)/100;
  const {
    clientData,
    serviceDatas,
    selectedDate,
    updateSelectedData,
    selectdId,
    stylist,
  } = useAppContext();
  // console.log(stylist);
  useEffect(() => {
    // Fetch data or perform any other actions based on clientData and serviceData
    // console.log("Client Data in Invoice:", clientData);
    // console.log("Service Data in Invoice:", serviceDatas);
    // console.log(serviceDatas.length);
    // console.log(selectdId);
  }, [clientData, serviceDatas]);
  useEffect(() => {
    // Assuming the condition for updating selectedServices is met
    if (serviceDatas.length > 0) {
      const updatedServices = [...selectedServices, ...serviceDatas];
      setSelectedServices(updatedServices);
    }
  }, [serviceDatas]);
  const Fclientname = Clientdata.find(
    (data) => Number(data.mobile_number) === Number(clientData)
  );
  // useEffect(() => {
  //   // Calculate the total based on selected services
  //   let total = 0;
  //   let total2 = 0;

  //   selectedServices.forEach((serviceName) => {
  //     const serviceData = serviceDatas.find(
  //       (data) => data.name_service === serviceName
  //     );

  //     if (serviceData) {
  //       const initialTotal =
  //         selectedType === "perc"
  //           ? serviceData.price - (serviceData.price * percentageValue) / 100
  //           : serviceData.price - flatValue;

  //       total2 = initialTotal + total2;
  //       total = Number(serviceData.price) + total;
  //     }
  //   });

  //   setTotalFinal(total);
  //   setTotalFinal2(total2);
  // }, [selectedServices, selectedType, percentageValue, flatValue, serviceDatas]);

  const Datapost =
    clientData === ""
      ? Cname
      : (Fclientname && Fclientname.name) || "Client Not Found"; // You can set this value based on your logic

  //  {console.log(Datapost)}
  {
    // console.log(selectData);
  }
  const insertData = async () => {
    const invoice_data = {
      aptId: selectdId,
      invoiceID:
        selectdId && selectedDate
          ? `INV|${selectedDate}|KRUB|${selectdId}`
          : `INV|${selectedDate}|KRUB|`,
      clientName:
        clientData === ""
          ? Cname
          : (Fclientname && Fclientname.name) || "Client Not Found",
      clientNumber: clientData !== "" ? clientData : search,
      date: selectedDate,
      stylistName: "your_stylist_name", // Replace with actual stylist name
      services: JSON.stringify(selectedServices),
      type: selectedType,
      totalPrice: totalFinal2,
      discountPrice: totalFinal - totalFinal2,
      paymentType: service,
    };
    axios
      .post("http://localhost/backend/addInvoice.php", invoice_data)
      .then((response) => {
        console.log("Data created:", response.data);

        // You might want to do something after a successful submission
      })
      .catch((error) => {
        console.error("Error creating data:", error);
      });
  };
  // const dbpath1 = "http://localhost/backend/";
  const [Edata, setEData] = useState([]);
  // const [filterData , setFilteredData] = useState([]);
  const loadEmployeeData = async () => {
    try {
      const response = await axios.get(dbpath1 + "getEmployeedata.php");
      const Employeedata = response.data.phpresult;
      setEData(Employeedata);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    loadEmployeeData(); // Call the loadData function when the component mounts
  }, []);
  // console.log(Edata);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [editedService, setEditedService] = useState(null);

  const handleDoubleClick = (serviceName) => {
    setIsEditing(true);
    setEditedValue("");
    setEditedService(serviceName);
  };

  const handleInputChange = (event) => {
    setEditedValue(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);

    // Perform any necessary action with the edited value and service name
    // You can use the `editedValue` and `editedService` states here

    // For example, update the discount for the edited service
    const updatedServices = selectedServices.map((service) =>
      service === editedService ? `${editedService} | ${editedValue}` : service
    );

    setSelectedServices(updatedServices);
    setEditedService(null);
  };
  //
  const [radio, setRadio] = useState("");

  const handleRadioClick = (value) => {
    setRadio(value);
  };
  console.log(radio);

  return (
    <>
      <Box
        color={"black"}
        // border={"1px solid green"}
        w={"full"}
        height={"fit-content"}
        p={2}
      >
        <Button
          color={"black"}
          borderBottom={
            location.pathname === "/Invoice" || "/invoice"
              ? "1px solid black"
              : ""
          }
          borderRadius={"none"}
        >
          INVOICE
        </Button>
        <Button color={"black"} as={Link} to={"/invoice-view"} opacity={0.5}>
          PREVIOUS INVOICES
        </Button>
        {selectdId ? (
          <Text
            border={"1px solid #131313"}
            mt={2}
            borderRadius="8px"
            color={"gray.900"}
            width={"fit-content"}
            p={2}
            fontFamily={"monospace"}
          >
            Appointment_ID : {selectdId}
          </Text>
        ) : (
          ""
        )}
      </Box>
      <Box display={"flex"} gap={4}>
        <Box
          h={"fit-content"}
          border={"1px solid gray"}
          // borderTop={'none'}
          flex={"60%"}
          // display={"flex"}
          gap={8}
          p={4}
          overflow={"hidden"}
        >
          <Box display={"flex"} borderBottom={"2px solid #dddd"} pb={4}>
            <InputGroup>
              <FormLabel color={"gray"} fontSize={"md"} mt={-4}>
                Customer
              </FormLabel>

              <InputLeftAddon
                children="+ 91"
                border={"1px solid gray"}
                color={"gray"}
                bg={"gray.100"}
                ml={-20}
                mt={4}
              />
              <Input
                type="text"
                _placeholder={{ color: "gray" }}
                _hover={{ border: "1px solid gray" }}
                border={"1px solid gray"}
                color="black"
                placeholder="Enter Number"
                ml={0}
                mt={4}
                value={clientData !== "" ? clientData : search}
                // value={clientData !== null ? setSearch(clientData) : search}
                onChange={filterClient}
              ></Input>
            </InputGroup>
            {suggestions.length > 0 && (
              <VStack
                align="start"
                spacing={0}
                w="20%"
                bg={"#121212"}
                top={"25%"}
                zIndex={9}
                transition={"ease-in 2s"}
                maxH={"90%"}
                pos={"absolute"}
                overflowY={"scroll"}
                display={search == "" ? "none" : display3}
              >
                {suggestions.map((data) => (
                  <Tag
                    key={data.id}
                    color={"gray.300"}
                    // mb={0}
                    borderRadius={"none"}
                    onClick={() =>
                      handleSuggestionClick(data.name, data.mobile_number)
                    }
                    cursor="pointer"
                    display={service == "" ? "none" : "block"}
                    w={"full"}
                    _hover={{ bg: "teal" }}
                    p={2}
                  >
                    {data.name + " | " + data.mobile_number}
                  </Tag>
                ))}
              </VStack>
            )}
            <InputGroup>
              <FormLabel color={"gray"} mt={-4} position={"relative"} left={12}>
                Date
              </FormLabel>

              <Input
                type="date"
                _placeholder={{ color: "gray" }}
                color="black"
                placeholder="YYYY-MM-DD"
                border={"1px solid gray"}
                _hover={{ border: "1px solid gray" }}
                w={"fit-content"}
                mt={4}
                value={selectedDate}
              ></Input>
              <InputRightAddon
                children={
                  <>
                    <SlCalender />
                    &nbsp;Date{" "}
                  </>
                }
                border={" 1px solid gray"}
                color={"gray"}
                bg={"gray.100"}
                ml={0}
                mt={4}
              />
            </InputGroup>
          </Box>
          <Box h={"fit-content"} pb={4} mt={4}>
            <Text
              color="gray"
              borderBottom={"2px solid #dddd"}
              fontWeight={"medium"}
              pb={3}
            >
              Services
            </Text>
            <Table>
              <Thead>
                <Tr>
                  <Th>Stylist</Th>
                  <Th>Service</Th>
                  <Th>Qty.</Th>
                  <Th>Price</Th>
                  <Th>Disc</Th>
                  <Th>Total</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody border={"2px dashed gray"}>
                {/* Your table rows go here */}
                {/* {console.log(selectedServices)} */}
                {selectedServices.map((Service, index) => {
                  const serviceData = servicedata.find(
                    (data) => data.name_service === Service
                  );

                  if (serviceData) {
                    const stylistForService = stylist.find(
                      (s) => s.split("-")[1] === Service
                    );
                    console.log(stylistForService);
                    const InitialTotal =
                      selectedType === "perc"
                        ? serviceData.price -
                          (serviceData.price * percentageValue) / 100
                        : serviceData.price - flatValue;

                    totalFinal2 = InitialTotal + totalFinal2;
                    const prevInitialTotal = Number(serviceData.price);
                    totalFinal = prevInitialTotal + totalFinal;

                    return (
                      <React.Fragment key={index}>
                        <Tr
                          fontSize={"small"}
                          color={"black"}
                          textAlign={"center"}
                        >
                          <Td>
                            {stylist.map((i) => (
                              <>{stylistForService ? i.split("-")[0] : ""}</>
                            ))}
                          </Td>
                          <Td>{Service}</Td>
                          <Td>1</Td>
                          <Td>{prevInitialTotal}</Td>

                          <Td onDoubleClick={() => handleDoubleClick(Service)}>
                            {isEditing && editedService === Service ? (
                              <Input
                                type="number"
                                value={editedValue}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                autoFocus
                              />
                            ) : (
                              <>
                                {
                                  /* ... (Existing cell content) */

                                  selectedType === "perc" ? (
                                    <>{percentageValue + " | P"}</>
                                  ) : selectedType === "flat" ? (
                                    <>{flatValue + " | F"}</>
                                  ) : (
                                    <>0 | 0</>
                                  )
                                }
                              </>
                            )}
                          </Td>
                          <Td>{"₹" + InitialTotal}</Td>
                          <Td>
                            <IconButton
                              variant={"outline"}
                              isRound
                              colorScheme="red"
                              icon={<IoClose />}
                              onClick={() => handleRemoveService(Service)}
                            />
                          </Td>
                        </Tr>
                      </React.Fragment>
                    );
                  }

                  return null; // If serviceData is undefined, skip rendering this fragment
                })}
              </Tbody>
            </Table>
          </Box>
          <Box border={"2px dashed black"} display={"flex"}>
            <Box flex={"70%"}>
              <Menu>
                <MenuButton
                  as={Button}
                  color={"black"}
                  variant={"outline"}
                  border={"1px solid gray"}
                  rightIcon={<FaSort />}
                  m={3}
                >
                  Services
                </MenuButton>
                <MenuList>
                  <MenuItem>Service_name</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  color={"black"}
                  variant={"outline"}
                  border={"2px solid red"}
                  rightIcon={<FaSort />}
                  ml={4}
                  m={3}
                  aria-required
                  _after={{
                    position: "absolute",
                    left: "100%",
                    bottom: "75%",
                    content: '"*"',
                    fontSize: "15px",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  Stylist
                </MenuButton>
                <MenuList maxH={"30dvh"} overflow={"auto"}>
                  <RadioGroup>
                    {Edata.map((i, key) => (
                      <MenuItem
                        index={key}
                        onClick={() => {
                          handleRadioClick(i.name);
                        }}
                      >
                        <Radio value={i.name}>{i.name}</Radio>
                      </MenuItem>
                    ))}
                  </RadioGroup>
                </MenuList>
              </Menu>
              <Input
                h={"40px"}
                w={"40%"}
                pos={"relative"}
                top={"3px"}
                ml={4}
                border={"1px solid #121214"}
                placeholder="Search..."
                _placeholder={{ color: "gray" }}
                _hover={{ border: "1px solid black" }}
                cursor={"pointer"}
                color={"#121212"}
              />
              <Box
                border={"1px solid red"}
                w={"fit-content"}
                ml={3}
                display={radio == "" ? "none" : "block"}
              >
                <Tag color={"teal"}>{radio}</Tag>
              </Box>
              <Box textAlign={"left"} display={"felx"}>
                <VStack
                  color={"black"}
                  alignItems={"flex-start"}
                  m={3}
                  w={"fit-content"}
                >
                  {servicedata.map((item, index) => (
                    <Box key={index} display={"flex"}>
                      <Text display={"felx"}>
                        {item.name_service.toUpperCase()}
                      </Text>
                      <Box position={"absolute"} left={"40%"}>
                        <Checkbox
                          value={item.name_service}
                          border={"gray"}
                          isChecked={selectedServices.includes(
                            item.name_service
                          )}
                          onChange={() =>
                            handleCheckboxChange(item.name_service)
                          }
                        ></Checkbox>
                      </Box>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </Box>
            <Box flex={"30%"} borderLeft={"1px dashed gray"}>
              <Center>
                <Text
                  color={"orange"}
                  borderBottom={"2px solid orange"}
                  fontSize={"large"}
                  fontWeight={"semibold"}
                >
                  Total
                </Text>
              </Center>
              <VStack
                color={"black"}
                alignItems={"flex-start"}
                ml={2}
                mt={2}
                fontSize={"sm"}
              >
                <Text>Subtotal : {"₹" + Number(totalFinal)}</Text>
                <Text>Discount : {"₹" + (totalFinal - totalFinal2)} </Text>
                <Text>Net: {"₹" + totalFinal2}</Text>
                <Text>SGST(9%) : {"₹" + (totalFinal2 * 9) / 100}</Text>
                <Text>CGST(9%) : {"₹" + (totalFinal2 * 9) / 100} </Text>
                <Text display={"flex"}>
                  Tip : &nbsp;
                  <Input
                    type="number"
                    border={"1px solid gray"}
                    _hover={{ border: "1px solid gray" }}
                    w={"80%"}
                    size={"sm"}
                  />{" "}
                </Text>
                <Text display={display2}>
                  Payment:{" "}
                  {"₹" + Number(totalFinal2 + ((totalFinal2 * 9) / 100) * 2)}{" "}
                  <Tag color={"teal"} bg={"gray.200"}>
                    {service}{" "}
                    <TagCloseButton
                      onClick={() => {
                        setService("");
                        setdisplay2("none");
                      }}
                    />
                  </Tag>{" "}
                </Text>
                <Text fontWeight={"semibold"}>
                  Total :{" "}
                  {"₹" + Number(totalFinal2 + ((totalFinal2 * 9) / 100) * 2)}{" "}
                </Text>
                <Text display={"flex"}>
                  {" "}
                  Paid :
                  <Text color={"teal"} display={display2}>
                    {"₹" + Number(totalFinal2 + ((totalFinal2 * 9) / 100) * 2)}{" "}
                  </Text>{" "}
                </Text>
                <Text display={"flex"}>
                  Balance :
                  <Text color={"red"} display={display2}>
                    {"₹" +
                      (Number(totalFinal2 + ((totalFinal2 * 9) / 100) * 2) -
                        Number(totalFinal2 + ((totalFinal2 * 9) / 100) * 2))}
                  </Text>{" "}
                </Text>
              </VStack>
            </Box>
          </Box>
        </Box>
        {/* Right Component */}
        <Box
          flex={"40%"}
          border={"1px solid gray"}
          h={"fit-content"}
          textAlign={"left"}
          pb={4}
          // borderTop={'none'}
        >
          <VStack
            color={"black"}
            textAlign={"left"}
            alignItems="start"
            ml={3}
            mt={2}
            borderBottom={"3px solid #dddd"}
            pb={2}
          >
            <Text display={"flex"}>
              {" "}
              <Text fontWeight={"semibold"}>Name : </Text>&nbsp;{" "}
              <Text bg={"gray.300"} p={2}>
                {clientData === ""
                  ? Cname
                  : (Fclientname && Fclientname.name) || "Client Not Found"}
              </Text>
            </Text>
            <Text display={"flex"}>
              {" "}
              <Text fontWeight={"semibold"}>Membership :</Text>
              &nbsp;membership_expire
            </Text>
            <Text display={"flex"}>
              {" "}
              <Text fontWeight={"semibold"}>Total Visit : </Text>
              &nbsp;YYYY/MM/DD
            </Text>
            <Text display={"flex"}>
              <Text fontWeight={"semibold"}>last Visit :</Text>&nbsp; YYYY/MM/DD
            </Text>
            <Text display={"flex"}>
              {" "}
              <Text fontWeight={"semibold"}>Points :</Text>&nbsp; user_points
            </Text>
          </VStack>
          <VStack
            color={"black"}
            h={"fit-content"}
            alignItems="start"
            ml={3}
            mt={2}
          >
            <Text display={"flex"}>
              {" "}
              <Text fontWeight={"semibold"}>
                Service Total : {"₹" + Number(totalFinal)}{" "}
              </Text>
            </Text>
            <Text display={"flex"}>
              {" "}
              <Text fontWeight={"semibold"}>Discount: </Text>
              <RadioGroup
                defaultValue="perc"
                onChange={(e) => handleTypeChange(e)}
              >
                <Stack spacing={5} direction="row" ml={4} mt={-1}>
                  <Radio
                    colorScheme="orange"
                    value="perc"
                    border={"2px solid gray"}
                  >
                    Percentage
                  </Radio>
                  <Radio
                    colorScheme="orange"
                    value="flat"
                    border={"2px solid gray"}
                  >
                    Flat
                  </Radio>
                  <Input
                    type="number"
                    color={"black"}
                    border={"1px solid gray"}
                    w={"fit-content"}
                    _placeholder={{ color: "gray" }}
                    _hover={{ border: "1px solid gray" }}
                    placeholder="Enter price/percentage"
                    mr={2}
                    h={"fit-content"}
                    borderRadius={"none"}
                    p={1}
                    value={selectedType == "perc" ? percentageValue : flatValue}
                    onChange={(e) => handleInputChange(e)}
                  />
                </Stack>
              </RadioGroup>
            </Text>
          </VStack>
          <HStack mt={6} ml={2}>
            <Button colorScheme="blackAlpha" isDisabled>
              Continue without payment
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                setdisplayS("block");
              }}
            >
              Add Payment
            </Button>
            <Button
              colorScheme="blackAlpha"
              color={"black"}
              display={displatS}
              onClick={() => {
                setService("");
                setdisplayS("none");
                setdisplay2("none");
              }}
            >
              {" "}
              <IoClose />{" "}
            </Button>
          </HStack>
          <HStack
            mt={2}
            color={"gray.800"}
            fontWeight={"semibold"}
            ml={2}
            overflow={"hidden"}
            p={1}
            display={displatS}
          >
            <Grid
              templateColumns="repeat(4, 1fr)"
              gap={2}
              pt={2}
              pos={"relative"}
              transition={"ease 0.3s"}
              textAlign={"center"}
              alignItems={"center"}
            >
              <Text color="black" w={"fit-content"} mr={0} fontWeight={"thin"}>
                {" "}
                Payment Mode
              </Text>
              {PaymentMode.map((item) => (
                <GridItem
                  w="100%"
                  h="fit-content"
                  p={2}
                  bg={item === service ? "yellow.200" : "gray.200"}
                  onClick={() => {
                    handleItemClick(item);
                  }}
                  cursor={"pointer"}
                  pointerEvents={item === "CASH" ? "pointer" : "none"}
                >
                  {item}
                </GridItem>
              ))}
            </Grid>
            {/* Cash Payment From  */}
            <Box mt={3} display={service === "CASH" ? "block" : "none"}>
              <Text fontWeight={"thin"}>
                Amount :{" "}
                <span style={{ fontWeight: "bold" }}>
                  {"₹" + Number(totalFinal2 + ((totalFinal2 * 9) / 100) * 2)}{" "}
                </span>
              </Text>
              <Text display={"felx"} mt={2} fontWeight={"thin"}>
                Add Note{" "}
                <Input
                  type="text"
                  border={"1px solid gray"}
                  _hover={{ border: "1px solid gray" }}
                />
              </Text>
              <Button
                variant={"outline"}
                colorScheme="orange"
                mt={3}
                onClick={() => {
                  setdisplay2("block");
                }}
              >
                Add
              </Button>
            </Box>
            <Box display={display2}>
              <Text mt={4} fontWeight={"thin"}>
                Description :{" "}
                <Textarea
                  border={"1px solid gray"}
                  _hover={{ border: "1px solid gray" }}
                ></Textarea>
              </Text>
              <Text display={"flex"} mt={3}>
                Send Invoice on :{" "}
                <RadioGroup defaultValue="2">
                  <Stack spacing={5} direction="row" ml={4} mt={0}>
                    <Radio
                      colorScheme="orange"
                      value="1"
                      border={"2px solid gray"}
                    >
                      SMS
                    </Radio>
                    <Radio
                      colorScheme="orange"
                      value="2"
                      border={"2px solid gray"}
                    >
                      Email
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Text>
              <Box mt={2}>
                <Center>
                  <Button
                    variant={"solid"}
                    color={"black"}
                    onClick={() => {
                      setService("");
                      setdisplayS("none");
                      setdisplay2("none");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={"solid"}
                    colorScheme="orange"
                    as={Link}
                    to={`/invoicegernrate/INV|${selectedDate}|KRUB|${selectdId}`}
                    // onClick={() => {
                    //   updateSelectedData(Datapost , selectedServices, selectedDate , "₹" + Number(totalFinal2 + ((totalFinal2 * 9) / 100) * 2));
                    // }}
                    onClick={insertData}
                  >
                    Generate
                  </Button>
                </Center>
              </Box>
            </Box>
          </HStack>
        </Box>
      </Box>
    </>
  );
}
