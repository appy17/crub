import { Box, Divider, Flex, FormLabel, HStack, Input, Select, Text , Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  VStack,
  Button,
  useStatStyles,
  useToast, } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Stock(props) {
  const { id } = props.data;
  const [type , settype] = useState('');
  const [s_type , setStype] = useState('');
  const [qty,setQty]=useState("");
  const [datei,setdatei]=useState(new Date().toISOString().split('T')[0]);
  const [disabled , setDisabled] = useState(true);
 
const toast = useToast();
  const insertData = async () => {
    const Stock_data = {
      product_id: id, // Assuming 'id' is the product ID received as a prop
      type_: type,
      st_type: s_type,
      qty_: qty, // You need to manage selectedService in your component state
      date: datei == '' ? new Date().toISOString().split('T')[0] : datei,
    };
    axios
      .post("http://localhost/backend/addStock.php", Stock_data)
      .then((response) => {
        console.log("Data created:", response.data);
        toast({
          position: "top-right",
          title: "Added !",
          status: "success",
        });
        // You might want to do something after a successful submission
      })
      .catch((error) => {
        console.error("Error creating data:", error);
      });
  };
  useEffect(() => {
    setDisabled(datei === "" || type === "" || s_type === "" || qty === "");
  }, [datei, type,s_type, qty]);
  return (
    <Box w={'100%'}>
      
      <HStack 
        gap={'7px'} color={'black'}  alignItems='flex-start'>
      <Flex flexDirection={"column"} width="50%">
                  <FormLabel color={"gray.600"} fontWeight={"light"}
                  fontSize={'sm'}>
                    Type
                  </FormLabel>
                  <Select
                    placeholder="Select"
                    border={"1px solid gray"}
                      // w="full"
                      value={type}
                      onChange={(e)=>{settype(e.target.value)}}
                    _hover={{ border: "1px solid black" }}
                  >
                    <option value="In">In</option>
                    {/* <option value="option3">Option 3</option> */}
                  </Select>
                </Flex>
                <Flex flexDirection={"column"} width="50%">
                  <FormLabel color={"gray.600"}
                   fontSize={'sm'}
                  fontWeight={"light"}>
                    Stock Type
                  </FormLabel>
                  <Select
                    placeholder="Select"
                    _pl
                    border={"1px solid gray"}
                    value={s_type}
                    onChange={(e)=>{setStype(e.target.value)}}
                    _hover={{ border: "1px solid black" }}
                  >
                    <option value="New Stock">New Stock</option>
                    <option value="Adjustment">Adjustment</option>
                    <option value="Internal Use">Internal Use</option>

                    
                  </Select>
                </Flex>
      </HStack>
      <HStack 
        gap={'7px'} color={'black'}  alignItems='flex-start'>
      <Flex flexDirection={"column"} width="50%">
                  <FormLabel color={"gray.600"} fontWeight={"light"}
                  fontSize={'sm'}>
                    Quantity
                  </FormLabel>
                  <Input
                  type='number'
                    border={"1px solid gray"}
                    placeholder=""
                    _placeholder={{ color: "gray" }}
                    _hover={{ border: "1px solid black" }}
                    cursor={"pointer"}
                    color={"#121212"}
                    value={qty}
                    onChange={(e)=>{setQty(e.target.value)}}
                  />
                </Flex>
                <Flex flexDirection={"column"} width="50%">
                  <FormLabel color={"gray.600"}
                   fontSize={'sm'}
                  fontWeight={"light"}>
                    Lot No 
                  </FormLabel>
                  <Input
                  type='number'
                    border={"1px solid gray"}
                    placeholder=""
                    _placeholder={{ color: "gray" }}
                    _hover={{ border: "1px solid black" }}
                    cursor={"pointer"}
                    color={"#121212"}
                    isDisabled
                  />
                </Flex>
      </HStack>
      {/* </VStack> */}
     
      <HStack 
        gap={'7px'} color={'black'}  alignItems='flex-start'>
      <Flex flexDirection={"column"} width="50%">
                  <FormLabel color={"gray.600"} fontWeight={"light"}
                  fontSize={'sm'}>
                    Date
                  </FormLabel>
                  <Input
                  type='date'
                    border={"1px solid gray"}
                    placeholder=""
                    _placeholder={{ color: "gray" }}
                    _hover={{ border: "1px solid black" }}
                    cursor={"pointer"}
                    color={"#121212"}
                    bg='#d2d2d2'
                    value={datei}
                    onChange={(e)=>{setdatei(e.target.value)}}

                  />
                </Flex>
                <Flex flexDirection={"column"} width="50%">
                  <FormLabel color={"gray.600"}
                   fontSize={'sm'}
                  fontWeight={"light"}>
                  Expire Date
                  </FormLabel>
                  <Input
                  type='date'
                    border={"1px solid gray"}
                    placeholder=""
                    _placeholder={{ color: "gray" }}
                    _hover={{ border: "1px solid black" }}
                    cursor={"pointer"}
                    color={"#121212"}
                    bg='#d2d2d2'
                    isDisabled

                  />
                </Flex>
      </HStack>
      {/* </Flex> */}
                <Flex flexDirection={"column"} width="100%">
                
                  <Button colorScheme='green' mt={7} alignSelf={'flex-end'} onClick={insertData} isDisabled={disabled}> Submit</Button>
                </Flex>
    </Box>
  )
}
