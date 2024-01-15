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

export default function Stock() {
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
                    _hover={{ border: "1px solid black" }}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
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

                    _hover={{ border: "1px solid black" }}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
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

                  />
                </Flex>
      </HStack>
      {/* </Flex> */}
                <Flex flexDirection={"column"} width="100%">
                
                  <Button colorScheme='green' mt={7} alignSelf={'flex-end'}> Submit</Button>
                </Flex>
    </Box>
  )
}
