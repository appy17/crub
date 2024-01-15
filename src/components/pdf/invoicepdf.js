import React, { useEffect, useRef, useState } from "react";
import {
  ChakraProvider,
  CSSReset,
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Button,
  Center,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tag,
  Spinner,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TbScissorsOff } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";
import html2canvas from 'html2canvas';
import {useReactToPrint} from 'react-to-print'
const InvoiceBill = () => {
  // const invoiceRef = useRef(null);
  const { id } = useParams();
  const [data, setdata] = useState({});
  const captureScreenshot = async () => {
    try {
      const element = document.getElementById('main'); // Replace 'invoice-container' with the actual ID of your container
      const screenshot = await html2canvas(element);
      console.log(screenshot.toDataURL());
      return screenshot.toDataURL();
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };
  
  // const openPrintWindow = () => {
  //   const printWindow = window.open("", "_blank");
  //   printWindow.document.write(
  //     "<html><head><title>Tax Invoice</title></head><body>"
  //   );
  //   printWindow.document.write(
  //     '<style>body { font-family: "Arial", sans-serif; }</style>'
  //   );
  //   printWindow.document.write(
  //     '<div style="max-width: 600px; margin: 0 auto; padding: 20px;">'
  //   );
  //   printWindow.document.write(invoiceRef.current.innerHTML);
  //   printWindow.document.write("</div></body></html>");
  //   printWindow.document.close();
  //   printWindow.print();
  //   printWindow.onafterprint = () => {
  //     printWindow.close();
  //   };
  // };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost/backend/getSpecificInvoicedata.php?invoice_id=${id}`
      );
      setdata(response.data[0]); // Assuming there's only one record for the given ID
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); // Fetch data whenever ID changes
  // const arratServices = []
  console.log(data);
  const [servicedata, setServiceData] = useState([]);

  const loadServiceData = async () => {
    try {
      const response = await axios.get("http://localhost/backend/getServicedata.php");
      const Servicedata = response.data.phpresult;
      setServiceData(Servicedata);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    loadServiceData(); // Call the loadData function when the component mounts
  }, []);


  // const Services = [...data.Services];
  const Invoiceref = useRef()
  const handlePrint = useReactToPrint ( {
   content : ()=> Invoiceref.current,
  });
  return (
    <ChakraProvider>
      <CSSReset />
      <Box display={"flex"}>
      
        <Box
          ref={Invoiceref}
          maxW="100%"
          // mx="auto"
          flex={"60%"}
          mt="8"
          p="6"
          border="1px solid #2D3748"
          // borderRadius="lg"
          color="#2D3748"
          m={2}
          id="main"
        >
          {!data && data.invoice_id == null ? <>Fetching......<Spinner mt={'10%'} ml={'3%'} /></> :  
            <>
          <Flex
            justify="space-between"
            mb="0"
            border={"1px dashed orange"}
            p={4}
          >
            <Heading
              fontSize="md"
              fontWeight={"semibold"}
              letterSpacing={2}
              display={"flex"}
            >
              Krub Salon&nbsp;
              <TbScissorsOff />
            </Heading>
          </Flex>
          <Text
            fontWeight={"xl"}
            fontSize={"xl"}
            bg={"gray.100"}
            display={"flex"}
            p={2}
          >
            {" "}
            INVOICE{" "}
          </Text>
          <VStack spacing="4" align="start" mt={2}>
        
            <Box display={"flex"} width={"100%"}>
            
              <Box ml={10}>

                <Text fontSize="md" fontWeight="semibold" color={"gray"}>
                  Invoice To,
                </Text>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  {data?.client_name}
                </Text>
                <Text color={"gray.700"}>{data.client_number}</Text>
                <Text>Nagpur , India</Text>
              </Box>
              <Box ml={"auto"} mr={10}>
                <Text
                  display={"flex"}
                  fontSize="sm"
                  fontWeight="semibold"
                  color={"gray"}
                >
                  InvoiceID{" "}
                  <Text
                    fontWeight={"semibold"}
                    fontSize={"md"}
                    color={"#121212"}
                  >
                    &nbsp;{"#" + data.invoice_id}{" "}
                  </Text>{" "}
                </Text>
                <Text
                  display={"flex"}
                  fontSize="sm"
                  fontWeight="semibold"
                  color={"gray"}
                  mt={2}
                >
                  {" "}
                  Date :
                  <Text
                    fontSize={"sm"}
                    display={"flex"}
                    fontFamily={"monospace"}
                    color={"black"}
                  >
                    <CiCalendarDate style={{ fontSize: "20px" }} />
                    {data.date}
                  </Text>
                </Text>
              </Box>
            </Box>
            <Divider borderColor="#4A5568" />
            <Center w={"full"}>
              <Table variant="simple" border={"1px dashed black"} w={"80%"}>
                <TableCaption color={"gray.400"}>
                  Bill is Digitally Genrated
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th textAlign={'center'}>Services</Th>
                    <Th textAlign={'center'}>Qty.</Th>
                    <Th textAlign={'center'}>Price</Th>
                    {/* <Th isNumeric>multiply by</Th> */}
                  </Tr>
                </Thead>
                <Tbody>
                {Array.isArray(data.service_details) && data.service_details.length > 0 ? (
    data.service_details.map((service, index) => {
      const exitService =  servicedata.find((s)=> s.name_service == service.checkboxValue)
      return(
      <Tr key={index} border={'1px dashed black'}>
        <Td fontFamily={'mono'} textAlign={'center'}>{service.checkboxValue} <Text color={'gray'} fontSize={'x-small'}>by {service.radioValue}</Text></Td>
        <Td textAlign={'center'}>1</Td>
        <Td textAlign={'center'}>{"₹" +Number(exitService.price)}</Td>
      </Tr>
    )})
  ) : (
    <Tr>
      <Td colSpan={2}>No services available</Td>
    </Tr>
  )}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th></Th>
                    <Th>Discount : {"₹" + Number(data.discount_price)} </Th>
                    <Th fontSize={"large"} bg={"#121212"} color={"teal.100"}>
                      Total : {"₹" + Number(data.total_price)}
                    </Th>
                  </Tr>
                </Tfoot>
              </Table>
            </Center>
            <Divider borderColor="#4A5568" />

            <Box border={'1px dashed orange'} p={2}>

            <Heading
              fontSize="md"
              fontWeight={"semibold"}
              letterSpacing={2}
              display={"flex"}
            >
              Krub Salon&nbsp;
              <TbScissorsOff />
            </Heading>
              <Text maxW={'60%'}>1st Floor, Mohta Complex, Chhaoni Rd, opposite Moil Office, above SBI 440013, Tailors Line, Sadar, Nagpur, Maharashtra 440013</Text>
            
            </Box>
          </VStack>
          </>
  }
        </Box>

     <Box flex={"40%"} >
          <Box borderBottom={'1px solid black'} h={'50dvh'} mt={2}>
             <VStack>
             {!data && data.invoice_id == null ? <Stack  h={'inherit'} w={'80%'} mt={'20%'}>
  
  <Skeleton height='20px' startColor="whitesmoke" endColor='#d2d2d2' mt={'0%'} />
  <Skeleton height='20px' startColor="whitesmoke" endColor='#d2d2d2' mt={'0%'} />
  <Skeleton height='20px' startColor="whitesmoke" endColor='#d2d2d2' mt={'0%'} />

</Stack>  :<>
              <Text color={'black'} fontFamily={'monospace'} fontSize={'md'} p={1}
               borderBottom={'2px dashed black'}>Miscellaneous</Text>
               <Text color={'black'}>Payment Type : {data.payment_type}</Text>
               <Tag color={'teal'} p={3}>Paid :{Number(data.paid_amount)}</Tag>
               <Tag color={'red.500'} p={3}>Balance :{Number(data.balance)}</Tag>
               </>
}
             </VStack>
          </Box>
          <Center>
            <Button
              mt="4"
              bg="#4CAF50"
              color="white"
              _hover={{ bg: "#45a049" }}
              // onClick={openPrintWindow}
              // onClick={captureScreenshot}
              onClick={handlePrint}
              isLoading = {!data && data?.invoice_id == null ? true : false}

            >
              Print Invoice
            </Button>
          </Center>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default InvoiceBill;

