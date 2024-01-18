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
  Button, } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Consumption(props) {
  const { id } = props.data;
  const [data, setdata] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost/backend/getStock.php?id=${id}`
      );
      setdata(response.data.phpresult?.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

  }, [id]);
  console.log(data);
  return (
    <Box w={'100%'}>
      
     
     <HStack mt={5} >
     <Table variant='simple'>
    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
    <Thead>
      <Tr >
        <Th  fontSize={'x-small'}>Type</Th>
        <Th   fontSize={'x-small'}>Date</Th>
        <Th  fontSize={'x-small'}>Created By</Th>
        <Th   fontSize={'x-small'}>Qty</Th>
        <Th   fontSize={'x-small'}>Stock Type</Th>
        <Th   fontSize={'x-small'}>Lot No</Th>


       
        
      </Tr>
    </Thead>
    <Tbody>
      {data?.map((i)=><Tr>
      <Td  fontSize={'small'}>{i.type}</Td>
        <Td   fontSize={'small'}>{i.date}</Td>
        <Td  fontSize={'small'}>{i.created_by}</Td>
        <Td   fontSize={'small'}>{i.quantity}</Td>
        <Td   fontSize={'small'}>{i.stock_type}</Td>
        <Td   fontSize={'small'}>{i.lot_no}</Td>

        
      
      </Tr>)}
    </Tbody>
  </Table>

     </HStack>
    </Box>
  )
}
