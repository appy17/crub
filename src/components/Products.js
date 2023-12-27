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
} from "@chakra-ui/react";
import axios from "axios";
import {  Link as RouteLink } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

const Products = () => {
  const [data, setData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page

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

  const handleProductSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const categories = [...new Set(data.map((product) => product.category))];

  const filteredData = data.filter(
    (product) =>
      (categoryFilter === "All" || product.category === categoryFilter) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.price.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const renderPagination = () => {
    const pageItems = [];

    for (let number = 1; number <= totalPages; number++) {
      pageItems.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
          style={{padding:'15px' , lineStyle : 'none'}}
          
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <Pagination style={{display:'flex' , padding:'10px'}}>
        <Pagination.Prev
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pageItems}
        <Pagination.Next
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );
  };

  return (
    <Center h="auto">
      <VStack spacing={4} align="start" w="80%" mt={10}>
        <HStack spacing={4} w="100%">
          <Input
            type="text"
            placeholder="Search Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            border="1px solid black"
            _placeholder={{ color: "gray" }}
            color="black"
          />
          <Select
            placeholder="Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            border="1px solid gray"
            color="black"
          >
            <option value="All" style={{ color: "whitesmoke" }}>
              All
            </option>
            {categories.map((category) => (
              <option
                key={category}
                style={{ color: "whitesmoke" }}
                value={category}
              >
                {category}
              </option>
            ))}
          </Select>
          <Button
            borderRadius="1.5rem"
            color="white"
            _hover={{ color: "white" }}
            w="40rem"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            as={RouteLink} to={'/AddProduct'}
            _active={{ bgGradient: "linear(to-l, #7928CA, #FF0080)" }}
          >
            Add Product
          </Button>
        </HStack>
        <Table
          variant="simple"
          size="lg"
          borderWidth="1px"
          borderColor="gray.300"
          borderRadius="md"
        >
          <Thead>
            <Tr>
              <Th w="20px">ProductId</Th>
              <Th>Product Name</Th>
              <Th>Quantity</Th>
              <Th>Size</Th>
              <Th>Unit</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((product) => (
              <Tr key={product.id}>
                <Td  color="gray">
                  {/* <Checkbox
                    isChecked={selectedProducts.includes(product.id)}
                    onChange={() => handleProductSelect(product.id)}
                    border="1px solid teal"
                  /> */}P{product.productid}
                </Td>
                <Td color="black">{product.name}</Td>
                <Td color="black" textAlign={'center'}>{product.quantity}</Td>
                <Td color="black">{product.size}</Td>
                <Td color="black">{product.unit}</Td>
                <Td color="black">{"₹" + Number(product.price)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {filteredData.length === 0 && (
          <Text>No products found matching the criteria.</Text>
        )}
        <Box mt={4} border={'2px solid teal'} borderRadius={"10px"} textAlign={"center"} color={"black"}>{renderPagination()}</Box>
      </VStack>
    </Center>
  );
};

export default Products;
