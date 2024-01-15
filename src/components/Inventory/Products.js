// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Center,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Input,
//   Select,
//   HStack,
//   VStack,
//   Text,
//   Button,
//   Checkbox,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { Route, Link as RouteLink} from 'react-router-dom'

// const Products = () => {
//   const [data, setData] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("All");

//   const loadData = async () => {
//     try {
//       const response = await axios.get("http://localhost/backend/getProducts.php");
//       const data = response.data.phpresult;
//       setData(data);
//       console.log(data);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const handleProductSelect = (productId) => {
//     if (selectedProducts.includes(productId)) {
//       setSelectedProducts(selectedProducts.filter((id) => id !== productId));
//     } else {
//       setSelectedProducts([...selectedProducts, productId]);
//     }
//   };

//   const categories = [...new Set(data.map((product) => product.category))];

//   const filteredData = data.filter(
//     (product) =>
//       (categoryFilter === "All" || product.category === categoryFilter) &&
//       (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.price.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   return (
//     <Center h="auto">
//       <VStack spacing={4} align="start" w="80%" mt={10}>
//         <HStack spacing={4} w="100%">
//           <Input
//             type="text"
//             placeholder="Search Product"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             border="1px solid black"
//             _placeholder={{ color: "gray" }}
//             color="black"
//           />
//           <Select
//             placeholder="Category"
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             border="1px solid gray"
//             color="black"
//           >
//             <option value="All" style={{ color: "whitesmoke" }}>
//               All
//             </option>
//             {categories.map((category) => (
//               <option
//                 key={category}
//                 style={{ color: "whitesmoke" }}
//                 value={category}
//               >
//                 {category}
//               </option>
//             ))}
//           </Select>
//           <Button
//             borderRadius="1.5rem"
//             color="white"
//             _hover={{ color: "white" }}
//             w="40rem"
//             bgGradient="linear(to-l, #7928CA, #FF0080)"
//             as={RouteLink} to={'/AddProduct'}
//             _active={{bgGradient : "linear(to-l, #7928CA, #FF0080)"}}
//           >
//             Add Product
//           </Button>
//         </HStack>
//         <Table
//           variant="simple"
//           size="lg"
//           borderWidth="1px"
//           borderColor="gray.300"
//           borderRadius="md"
//         >
//           <Thead>
//             <Tr>
//               <Th w="20px">Select</Th>
//               <Th>Product Name</Th>
//               <Th>Quantity</Th>
//               <Th>Size</Th>
//               <Th>Unit</Th>
//               <Th>Price</Th>

//             </Tr>
//           </Thead>
//           <Tbody>
//             {filteredData.map((product) => (
//               <Tr key={product.id}>
//                 <Td w="20px">
//                   <Checkbox
//                     isChecked={selectedProducts.includes(product.id)}
//                     onChange={() => handleProductSelect(product.id)}
//                     border="1px solid teal"
//                   />
//                 </Td>
//                 <Td color="black">{product.name}</Td>
//                 <Td color="black" textAlign={'center'}>{product.quantity}</Td>
//                 <Td color="black">{product.size}</Td>
//                 <Td color="black">{product.unit}</Td>
//                 <Td color="black">{ "₹" + Number(product.price)}</Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//         {filteredData.length === 0 && (
//           <Text>No products found matching the criteria.</Text>
//         )}
//       </VStack>
//     </Center>
//   );
// };

// export default Products;

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
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { Link, Link as RouteLink, useLocation } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { IoSearch } from "react-icons/io5";
import Issue from "./Issue";
import Cosupmtion from "./Cosupmtion";
import Stock from "./Stock";
import StockHistory from "./StockHistory";

const Products = () => {
  const [data , setData] = useState([]);
  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost/backend/getProducts.php");
      const data = response.data.phpresult;
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  const categories =  [...new Set(data.map((product) => product.category))];
  console.log(categories)
  const location = useLocation();
  const [value, setvalue] = useState([]);
  const [component, setcomponent] = useState("Issue");
  const [clickedCategory, setClickedCategory] = useState(null);

  const handleTableItemClick = (category) => {
    setClickedCategory(category);
  };

  return (
    <>
      <Box
        color={"black"}
        borderBottom={"1px solid #d2d2d2"}
        w={"full"}
        height={"fit-content"}
        p={2}
        // display={'flex'}

        pos={"sticky"}
        top={0}
      >
        <Button
          color={"black"}
          borderRadius={"none"}
          borderBottom={location.pathname == '/inventory/products' ? "1px solid black" : ''}
        >
          PRODUCTS
        </Button>
        <Button
          color={"black"}
          borderRadius={"none"}
          opacity={0.5}
          as={Link}
          to={'/inventory/stock-ledger'}
          // borderBottom={
          //   location.pathname == "/invoice-view" ? "1px solid black" : ""
          // }
        >
          STOCK LEDGER
        </Button>
      </Box>
      <Box display={"flex"} width={"100%"} height={"92dvh"}>
        {/* table container */}
        <Box
          flex={"50%"}
          overflowY={"scroll"}
          borderRight={"1px solid #d2d2d2"}
          css={{
            "&::-webkit-scrollbar": {
              width: "3px",
            },
            "&::-webkit-scrollbar-track": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#c4c4c4",
              // borderRadius: '24px',
            },
          }}
        >
          <Box
            borderBottom={"1px solid pink"}
            color={"black"}
            w={"100%"}
            h={"25vh"}
            textAlign={"center"}
          >
            <VStack alignItems={"flex-start"} m={2}>
              <HStack
                alignItems={"flex-start"}
                w={"100%"}
                justifyContent={"space-between"}
              >
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
                w={"100%"}
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
                    width={"150%"}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </Flex>
                <Flex flexDirection={"column"} ml={"11%"}>
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
            </VStack>
          </Box>
          <TableContainer>
            <Table variant="simple" color={"black"}>
              <TableCaption color={"gray.400"}>
                Products are Stored in Categorical Manner
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Products By Categories</Th>
                  {/* <Th>into</Th>
        <Th isNumeric>multiply by</Th> */}
                </Tr>
              </Thead>
              <Tbody>
                {categories.map((i) => (
                  <Tr>
                    <Accordion allowMultiple>
                      <AccordionItem>
                        <h2>
                          <AccordionButton bg={clickedCategory === i ? 'linkedin.100' : 'gray.50'}
                           _hover={{bg:clickedCategory === i ? 'linkedin.200' : 'gray.100'}}>
                            <Box as="span" flex="1" textAlign="left" >
                            {clickedCategory === i ? `${i} (Selected)` : i}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel p={0} maxW={'inherit'}>
                        <Table variant='simple'>
          <Thead borderBottom='1px solid red'>
            <Tr>
              <Th fontSize={'x-small'}>Name</Th>
              <Th fontSize={'x-small'}>Price</Th>
              <Th fontSize={'x-small'}>Quantity</Th>
              <Th fontSize={'x-small'}>Size</Th>
              <Th fontSize={'x-small'}>Unit</Th>
              <Th fontSize={'x-small'}>Type</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data
              .filter((item) => item.category === i)
              .map((item) => (
                <Tr key={item.name}>
                  <Td
                   onClick={() => {
                    handleTableItemClick(i);
                    setvalue(item);
                  }}
                    cursor={'pointer'}
                  >
                    <Tag bg={value.name == item.name ? 'linkedin.200' :'green.50'} p={3} color={'black'} >{item.name}</Tag>
                  </Td>
                  <Td>{item.type == 'r'  ? item.price : 0}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>{item.size}</Td>
                  <Td>{item.unit}</Td>
                  <Td>{item.type}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box flex={"50%"}>
          { value == '' ? <Center color={'black'}>No Product Selected ! </Center> : <Box display={"flex"} flexDirection={"column"} h={"91vh"}>
            <Box flex={"30%"}
     boxShadow={'2px 5px 5px 0px #d2d2d2;'}
     >
              <HStack
                maxW={"100%"}
                p={4}
                mt={6}
                justifyContent={"space-between"}
              >
                <Box display={'flex'} flexDirection={'column'}> 
                  <Avatar size={"xl"} />
                  <Tag colorScheme='linkedin' mt={4} color={'linkedin.800'}>{value.name}</Tag>
                </Box>
                {value == " " ? (
                  "No"
                ) : (
                  <>
                    <VStack
                      color={"black"}
                      fontSize={"sm"}
                      alignItems={"flex-start"}
                    >
                      <Text>Price :{value.price}</Text>
                      <Text>Stock :{value.quantity}</Text>
                      <Text>Stock Value: 0 </Text>
                    </VStack>
                    <VStack
                      color={"black"}
                      alignItems={"flex-start"}
                      fontSize={"sm"}
                    >
                      <Text>Details : Null</Text>
                      <Text>Brand :{value.brand}</Text>
                      <Text>SKU </Text>
                    </VStack>{" "}
                  </>
                )}
              </HStack>
              <HStack
                justifyContent={"space-between"}
                margin={"auto"}
                maxW={"90%"}
                mt={6}
              >
                <Button variant={component == 'Issue' ? 'solid' : 'ghost'} colorScheme='linkedin' 
                  onClick={()=>{setcomponent('Issue')}}
                  borderBottomRadius={'none'}>
                  Issue
                </Button>
                <Button variant={component == 'Consumption' ? 'solid' : 'ghost'} colorScheme='linkedin'
                 onClick={()=>{setcomponent('Consumption')}}
                 borderBottomRadius={'none'}>
                  Cosumption
                </Button>
                <Button variant={component == 'Stock' ? 'solid' : 'ghost'} colorScheme='linkedin'
                onClick={()=>{setcomponent('Stock')}}
                borderBottomRadius={'none'}>
                  Stock
                </Button>
                <Button variant={component == 'StockHistory' ? 'solid' : 'ghost'} colorScheme='linkedin'
                onClick={()=>{setcomponent('StockHistory')}}
                borderBottomRadius={'none'}>
                  Stock History
                </Button>
              </HStack>
            </Box>
            <Box flex={"70%"} mt={5}>
              <Box display='flex' justifyContent={'center'} color={"black"}  className="main" margin={'10px'}>
                {component == "Issue" ? (
                  <Issue data={value}/>
                ) : component == "Consumption" ? (
                  <Cosupmtion data={value}/>
                ) : component == "Stock" ? (
                  <Stock />
                ) : component == "StockHistory" ? (
                  <StockHistory />
                ) : (
                  ""
                )}
              </Box>
            </Box>
          </Box>}
        </Box>
      </Box>
    </>
  );
};

export default Products;
