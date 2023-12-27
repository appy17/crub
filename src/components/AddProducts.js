import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  Select,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsFillSendPlusFill } from 'react-icons/bs';

export default function AddProduct() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost/backend/getProducts.php");
      const data = response.data.phpresult;
      setData(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: '',
    size: '',
    quantity: '',
    unit: '',
  });

  const handleAddProduct = () => {
    setLoading(true);

    const filteredData = Object.fromEntries(
      Object.entries(productData).filter(([_, value]) => value !== null && value !== '')
    );

    if (Object.keys(filteredData).length > 0) {
      axios.post('http://localhost/backend/addProducts.php', filteredData)
        .then((response) => {
          toast({
            containerStyle: {
              zIndex: 999999999,
            },
            position: 'top',
            title: 'Data Added.',
            description: 'Product Data added to the Database',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          setLoading(false);
          setProductData({
            name: '',
            category: '',
            price: '',
            size: '',
            quantity: '',
            unit: '',
          });
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      console.error('Invalid data. Please fill in all fields.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const isFilled = Object.values(productData).every((value) => value.trim() !== '');
    setDisabled(!isFilled);
  }, [productData]);

  const categories = [...new Set(data.map((product) => product.category))];

  const handleCategoryChange = (e) => {
    setProductData({
      ...productData,
      category: e.target.value,
    });
  };

  const handlePopoverSubmit = () => {
    if (newCategory.trim() !== '') {
      setData([...data, { category: newCategory }]);
      setProductData((prevData) => ({
        ...prevData,
        category: newCategory,
      }));
      onClose();
      setNewCategory(''); // Close the popover after submitting
    }
  };

  return (
    <Flex minH={'92vh'} align={'center'} justify={'center'} bg={'white'} mt={0}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={0} px={0}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'} color={'black'}>
            Add a Product
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Submit data in the given form ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={'whitesmoke'} boxShadow={'lg'} p={8}>
          <Stack spacing={3}>
            <HStack spacing={2}>
              <FormControl id="name" isRequired>
                <FormLabel color={'gray'}>Product Name</FormLabel>
                <Input
                  type="text"
                  border={'1px solid gray'}
                  color={'black'}
                  focusBorderColor={'black'}
                  _hover={{ border: '1px solid ' }}
                  onChange={handleChange}
                  name="name"
                  value={productData.name}
                />
              </FormControl>

              <FormControl id="category" isRequired    mt={6}>
                <FormLabel color={'gray'}>Select Category</FormLabel>
                <Select
                  border={'1px solid gray'}
                  color={'black'}
                  _hover={{ border: '1px solid gray' }}
                  cursor={'pointer'}
                  w={'100%'}
                  onChange={handleCategoryChange}
                  value={productData.category}
                  placeholder="Category"
                  // mt={10}
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      style={{ color: 'whitesmoke' }}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </Select>
                <Popover  isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
                  <PopoverTrigger>
                    <Button colorScheme='purple' color={'black'} size={'xs'}>Add Category</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Add New Category</PopoverHeader>
                    <PopoverBody>
                      <Input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                      />
                      <Button onClick={handlePopoverSubmit} colorScheme='telegram' mt={2}>Submit</Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </FormControl>
            </HStack>

            

            <FormControl id="size" isRequired>
              <FormLabel color={'gray'}>Size</FormLabel>
              <Input
                type="text"
                border={'1px solid gray'}
                color={'black'}
                focusBorderColor={'black'}
                _hover={{ border: '1px solid ' }}
                onChange={handleChange}
                name="size"
                value={productData.size}
              />
            </FormControl>

            <FormControl id="quantity" isRequired>
              <FormLabel color={'gray'}>Quantity</FormLabel>
              <Input
                type="number"
                border={'1px solid gray'}
                color={'black'}
                focusBorderColor={'black'}
                _hover={{ border: '1px solid ' }}
                onChange={handleChange}
                name="quantity"
                value={productData.quantity}
              />
            </FormControl>

            <FormControl id="unit" isRequired>
              <FormLabel color={'gray'}>Unit</FormLabel>
              <Input
                type="text"
                border={'1px solid gray'}
                color={'black'}
                focusBorderColor={'black'}
                _hover={{ border: '1px solid ' }}
                onChange={handleChange}
                name="unit"
                value={productData.unit}
              />
            </FormControl>
            <FormControl id="price" isRequired>
              <FormLabel color={'gray'}>Price</FormLabel>
              <Input
                type="text"
                border={'1px solid gray'}
                color={'black'}
                focusBorderColor={'black'}
                _hover={{ border: '1px solid ' }}
                onChange={handleChange}
                name="price"
                value={productData.price}
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Adding"
                size="lg"
                bg={'black'}
                color={'white'}
                _hover={{
                  bg: 'gray.600',
                }}
                transition={'ease-in 0.1s'}
                isLoading={loading}
                onClick={handleAddProduct}
                isDisabled={disabled}
              >
                Add&nbsp;&nbsp;<BsFillSendPlusFill />
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
