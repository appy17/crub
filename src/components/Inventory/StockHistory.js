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
import React from 'react'

export default function Consumption() {
  return (
    <Box w={'100%'}>
      
     
     <HStack mt={5} >
     <Table variant='simple'>
    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
    <Thead>
      <Tr >
        <Th  fontSize={'x-small'}>Used By</Th>
        <Th   fontSize={'x-small'}>Mesurment</Th>
        <Th  fontSize={'x-small'}>Service</Th>
        <Th   fontSize={'x-small'}>Consumption Date</Th>

       
        
      </Tr>
    </Thead>
    <Tbody>
      {/* <Tr>
        <Td></Td>
        <Td></Td>
        <Td ></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>

        
      
      </Tr> */}
    </Tbody>
  </Table>

     </HStack>
    </Box>
  )
}
