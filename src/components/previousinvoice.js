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
  console.log(invoiceD ? invoiceD : '');
  
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
      {/* <Input
        m={4}
        type="text"
        border={"1px solid black"}
        placeholder="Search....."
        w={"56%"}
        _placeholder={{color:'gray'}}
        color={'black'}
        _hover={{border:'1px solid black'}}
      /> */}

      {/* <Center mt={'10%'}><Heading color={'#141414'} fontSize={'md'} fontWeight={'hairline'}>Nothing To See | Under Developement</Heading>
                <Spinner color='black' ml={10}/></Center> */}

      {invoiceD == '' ? (
        <Center mt={"10%"}>
          <Heading color={"#141414"} fontSize={"md"} fontWeight={"hairline"}>
            {" "}
            No Invoice Yet !{" "}
          </Heading>
          <Spinner color="black" ml={10} />
        </Center>
      ) : (
        <Flex direction={"column"} p={4} gap={6}>
          {invoiceD?.map((i) => (
            <Box
              w={"60%"}
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
                    &nbsp; {i.invoice_id}
                  </Text>
                </VStack>
              </Box>
              <Box flex={"20%"} borderLeft={"1px dashed #dabdf1"}>
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
      )}
    </>
  );
}
