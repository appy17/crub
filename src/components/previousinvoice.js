import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Input,
  Spinner,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import { Link as RouteLink } from "react-router-dom";
import {
  IoCheckmarkDoneCircleSharp,
  IoCheckmarkDoneOutline,
} from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
export default function Previousinvoice() {
  const location = useLocation();
  const dbpath1 = "http://localhost/backend/";
  const [invoiceD, setInvoiceD] = useState([]);
  const loadInvoiceData = async () => {
    try {
      const response = await axios.get(dbpath1 + "getInvoicedata.php");
      const data = response.data;
      setInvoiceD(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  // console.log(invoiceD);
  useEffect(() => {
    loadInvoiceData();
  }, []);
  console.log(invoiceD ? invoiceD : "");
  const [search, setSearch] = useState("");
  const [sDate, setSdate] = useState("");
  const [selecdType, setSelectefType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  function handleChangeSearch(e) {
    setSearch(e.target.value);
  }
  function handleChangeDate(e) {
    setSdate(e.target.value);
  }
  function handleChangeType(type) {
    setSelectefType(type);
  }
  function handleChangeStatus(status) {
    setSelectedStatus(status);
  }
  const filterData = () => {
    let filteredData = invoiceD;

    // Filter by name or number
    if (search) {
      filteredData = filteredData.filter(
        (item) =>
          item.client_name.toLowerCase().includes(search.toLowerCase()) ||
          item.client_number.includes(search)
      );
    }

    // Filter by date
    if (sDate) {
      filteredData = filteredData.filter((item) => item.date === sDate);
    }

    // Filter by status
    if (selectedStatus) {
      filteredData = filteredData.filter(
        (item) =>
          (selectedStatus === "Paid" && Number(item.balance) === 0) ||
          (selectedStatus === "Balanced" && Number(item.balance) > 0)
      );
    }

    // Filter by type
    if (selecdType) {
      filteredData = filteredData.filter(
        (item) => item.invoice_type.toLowerCase() === selecdType.toLowerCase()
      );
    }

    return filteredData;
  };

  const filteredInvoiceData = filterData();

  return (
    <>
      <Box
        color={"black"}
        borderBottom={"1px solid gray"}
        w={"full"}
        height={"fit-content"}
        p={2}
        // display={'flex'}
      >
        <Button
          color={"black"}
          borderRadius={"none"}
          as={Link}
          to={"/Invoice"}
          opacity={0.5}
        >
          INVOICE
        </Button>
        <Button
          color={"black"}
          borderRadius={"none"}
          borderBottom={
            location.pathname == "/invoice-view" ? "1px solid black" : ""
          }
        >
          PREVIOUS INVOICES
        </Button>
      </Box>

      {invoiceD == "" ? (
        <Center mt={"10%"}>
          <Heading color={"#141414"} fontSize={"md"} fontWeight={"hairline"}>
            {" "}
            No Invoice Yet !{" "}
          </Heading>
          <Spinner color="black" ml={10} />
        </Center>
      ) : (
        <Box display={"flex"} flexDirection={"row"}>
          <Flex direction={"column"} p={4} gap={6} flex={"60%"}
           borderRight={'1px solid #d2d2d2'}>
            {filteredInvoiceData?.map((i) => (
              <Box
                w={"100%"}
                h={"fit-content"}
                borderRadius={"8px"}
                bg={"gray.100"}
                display={"flex"}
              >
                <Box flex={"80%"}>
                  <VStack color={"black"} p={4} alignItems={"flex-start"}>
                    <Text fontSize={"large"} fontWeight={"semibold"}>
                      {i.client_name}
                    </Text>
                    <Text
                      display={"flex"}
                      fontWeight={"semibold"}
                      color={"purple.400"}
                    >
                      {" "}
                      <Text color={"gray.500"} fontWeight={"semibold"}>
                        Date :
                      </Text>
                      &nbsp; {i.date}{" "}
                    </Text>
                    <Text
                      display={"flex"}
                      fontWeight={"semibold"}
                      color={"purple.400"}
                    >
                      {" "}
                      <Text color={"gray.500"} fontWeight={"semibold"}>
                        Phone Number :
                      </Text>
                      &nbsp; {i.client_number}
                    </Text>
                    <Text
                      display={"flex"}
                      fontWeight={"semibold"}
                      color={"purple.400"}
                    >
                      {" "}
                      <Text color={"gray.500"} fontWeight={"semibold"}>
                        Invoice ID :
                      </Text>
                      &nbsp; {i.invoice_id} &nbsp;
                      <Tag
                        bg={
                          i.invoice_type === "Products"
                            ? "orange.300"
                            : "green.300"
                        }
                      >
                        {i.invoice_type}
                      </Tag>
                    </Text>
                  </VStack>
                </Box>
                <Box flex={"20%"} borderLeft={"1px dashed #dabdf1"}>
                  {/* <Center>
                <Tag colorScheme='purple'>{i.invoice_type}</Tag>
                </Center> */}
                  <Center>
                    <Button
                      variant={"ghost"}
                      color={"purple.400"}
                      _hover={{ bg: "purple.100" }}
                      leftIcon={<FaRegEye />}
                      mt={"35%"}
                      as={Link}
                      to={`/invoicegernrate/${i.invoice_id}`}
                    >
                      {" "}
                      View
                    </Button>
                  </Center>
                  <Center>
                    <Box mt={3}>
                      {Number(i.balance) > 0 ? (
                        <Tag bg={"red.400"} color={"white"} p={3}>
                          <Spinner size={"sm"}></Spinner>
                          &nbsp;Balance
                          {/* {Number(i.balance)} */}
                        </Tag>
                      ) : (
                        <Tag bgColor={"teal"} p={3} display={"flex"}>
                          {" "}
                          <IoCheckmarkDoneOutline />
                          &nbsp; Paid
                        </Tag>
                      )}
                    </Box>
                  </Center>
                </Box>
              </Box>
            ))}
          </Flex>
          <Box
            flex={"40%"}
            p={4}
            display={"flex"}
            flexDirection={"column"}
            gap={"10px"}
            position={'sticky'}
            top={'8dvh'}
          >
            <Input
              border={"1px solid gray"}
              placeholder="Search Name or Number...."
              _placeholder={{ color: "gray" }}
              _hover={{ border: "1px solid black" }}
              cursor={"pointer"}
              color={"#121212"}
              value={search}
              onChange={handleChangeSearch}
            />
            <Box display={"flex"}>
              <label style={{ color: "black", alignSelf: "center" }}>
               Date :{" "}
              </label>
              <Input
                type="date"
                border={"1px solid gray"}
                w={"50%"}
                ml={3}
                _placeholder={{ color: "gray" }}
                _hover={{ border: "1px solid black" }}
                bg={"black"}
                value={sDate}
                onChange={handleChangeDate}
              />
            </Box>
            <Box display={"flex"} gap={"10px"} color={"black"}>
              <label style={{ color: "black", alignSelf: "center" }}>
                Status :{" "}
              </label>

              <Tag
                color={"black"}
                p={4}
                cursor={"pointer"}
                onClick={() => {
                  handleChangeStatus("Paid");
                }}
                bg={selectedStatus === "Paid" ? "teal.300" : "gray.200"}
              >
                Paid
              </Tag>
              <Tag
                color={"black"}
                p={4}
                cursor={"pointer"}
                onClick={() => {
                  handleChangeStatus("Balanced");
                }}
                bg={selectedStatus === "Balanced" ? "red.300" : "gray.200"}
              >
                Balanced
              </Tag>
              <Tag
                onClick={() => {
                  setSelectedStatus("");
                }}
                color={"black"}
                cursor={"pointer"}
                display={selectedStatus === '' ? 'none' : 'flex'}
              >
                <IoMdClose />
              </Tag>
            </Box>
            <Box display={"flex"} gap={"10px"} color={"black"}>
              <label style={{ color: "black", alignSelf: "center" }}>
                 Type :{" "}
              </label>

              <Tag
                p={4}
                cursor={"pointer"}
                onClick={() => {
                  handleChangeType("Services");
                }}
                color={'black'}
                bg={selecdType === 'Services' ? 'green.300' : 'gray.200'}
              >
                Services
              </Tag>
              <Tag
                p={4}
                cursor={"pointer"}
                onClick={() => {
                  handleChangeType("Products");
                }}
                color={'black'}
                bg={selecdType === 'Products' ? 'orange.300' : 'gray.200'}
              >
                Product
              </Tag>
              <Tag
                onClick={() => {
                  setSelectefType("");
                }}
                color={"black"}
                cursor={"pointer"}
                display={selecdType === '' ? 'none' : 'flex'}

              >
                <IoMdClose />
              </Tag>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
