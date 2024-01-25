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
  Select,
  HStack,
  VStack,
  Text,
  Button,
  Checkbox,
  TableContainer,
  TableCaption,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  FormLabel,
  Avatar,
  Tag,
  Tfoot,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function StockLedger() {
  const location = useLocation();
  const [data, setdata] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost/backend/getSLedger.php`
      );
      setdata(response.data.phpresult?.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(()=>{
    fetchData()
  },[])
console.log('data', data)
  return (
    <>
      <Box
        color={"black"}
        w={"full"}
        height={"fit-content"}
        p={2}
        // display={'flex'}
        borderBottom={"1px solid #d2d2d2"}
        pos={"sticky"}
        top={0}
      >
        <Button
          color={"black"}
          borderRadius={"none"}
          opacity={0.5}
          as={Link}
          to={"/inventory/products"}
        >
          PRODUCTS
        </Button>
        <Button
          color={"black"}
          borderRadius={"none"}
          borderBottom={
            location.pathname == "/inventory/stock-ledger"
              ? "1px solid black"
              : ""
          }
        >
          STOCK LEDGER
        </Button>
      </Box>
      {/* <Center color={'black'} mt={'10%'}>
   
      </Center> */}

      <Box
        borderBottom={"1px solid pink"}
        color={"black"}
        w={"100%"}
        textAlign={"center"}
      >
        <HStack m={2}>
          <HStack alignItems={"flex-start"} justifyContent={"space-between"}>
            <Flex flexDirection={"column"}>
              <FormLabel color={"gray.600"} fontWeight={"light"}>
                Search
              </FormLabel>
              <Input
                border={"1px solid gray"}
                placeholder="🔍 Search..."
                _placeholder={{ color: "gray" }}
                _hover={{ border: "1px solid black" }}
                cursor={"pointer"}
                color={"#121212"}
              />
            </Flex>
            <Flex flexDirection={"column"}>
              <FormLabel color={"gray.600"} fontWeight={"light"}>
                Category
              </FormLabel>
              <Select
                placeholder="Select option"
                border={"1px solid gray"}
                _hover={{ border: "1px solid black" }}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Flex>
            <Flex flexDirection={"column"}>
              <FormLabel color={"gray.600"} fontWeight={"light"}>
                Sub Category
              </FormLabel>
              <Select
                placeholder="Select option"
                border={"1px solid gray"}
                _hover={{ border: "1px solid black" }}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Flex>
          </HStack>
          <HStack
            alignItems={"flex-start"}
            // w={"100%"}
            justifyContent={"space-between"}
          >
            <Flex flexDirection={"column"}>
              <FormLabel color={"gray.600"} fontWeight={"light"}>
                Brand
              </FormLabel>
              <Select
                placeholder="Select option"
                border={"1px solid gray"}
                _hover={{ border: "1px solid black" }}
                size={"md"}
                // width={"150%"}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Flex>
            <Flex flexDirection={"column"}>
              <FormLabel color={"gray.600"} fontWeight={"light"}>
                Type
              </FormLabel>
              <Select
                placeholder="Select option"
                border={"1px solid gray"}
                _hover={{ border: "1px solid black" }}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Flex>
            <Flex flexDirection={"column"}>
              <FormLabel color={"gray.600"} fontWeight={"light"}>
                Qty
              </FormLabel>
              <Select
                placeholder="Select option"
                border={"1px solid gray"}
                _hover={{ border: "1px solid black" }}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Flex>
          </HStack>
        </HStack>
      </Box>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Type</Th>
              <Th>Stock Type</Th>
              <Th>Lot No</Th>
              <Th>Quantity</Th>
              <Th>Beofre/After</Th>
              <Th>Created By</Th>
              <Th>Remarks</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((i) => <Tr>
              <Td color={"black"}>{i.p_name.split('|')[1]}</Td>
              <Td color={"black"}>{i.type}</Td>
              <Td color={"black"}>{i.s_type}</Td>
              <Td color={"black"}>{i.lot_no}</Td>
              <Td color={"black"}>{i.qty}</Td>
              <Td color={"black"} display={'flex'}>
              <Box width="fit-content" display={'flex'}>
          {/* <Input
            border={"1px solid green"}
            _hover={{ border: "none" }}
            w={"fit-content"}
            color={"black"}
            pointerEvents={"none"}
            value={i.before_value + '/' + i.after_value}
            textAlign={'center'}
          /> */}

{i.before_value}/<Editable defaultValue={i.after_value}>
  <EditablePreview />
  <EditableInput />
</Editable>
        </Box>
              </Td>
              <Td color={"black"}>{i.c_by}</Td>
              <Td color={"black"}>{i.remarks}</Td>
              <Td color={"black"}>{i.date}</Td>
            </Tr>)}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
