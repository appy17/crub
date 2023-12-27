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
  useToast,
  Select,
  InputLeftAddon,
  InputGroup,
} from '@chakra-ui/react';
import axios from 'axios';
import { color } from 'framer-motion';
import { useState , useEffect } from 'react';
import { BsFillSendPlusFill } from 'react-icons/bs';

export default function AddEmployee() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [employeeData, setEmployeeData] = useState({
    name: '',
    dob: '',
    phoneNumber: '',
    experience: '',
    category: '',
    salary : '' // New field for category
  });

  const handleDataEmployee = () => {
    setLoading(true);

    axios.post('http://localhost/backend/addEmployee.php', employeeData)
      .then((response) => {
        toast({
          containerStyle: {
            zIndex: 999999999,
          },
          position: 'top',
          title: 'Data Added.',
          description: 'Employee Data added to Database',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);

        // Reset form data after successful submission
        setEmployeeData({
          name: '',
          dob: '',
          phoneNumber: '',
          experience: '',
          category: '',
          salary:'' // Reset category as well
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });

    const isFilled = Object.values(employeeData).every((value) => value.trim() !== '');
    setDisabled(!isFilled);
  };

  return (
    <Flex minH={'92vh'} align={'center'} justify={'center'} bg={'white'} mt={0}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={0} px={0}>
      <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'} color={'black'}>
             Add an Employee
           </Heading>
           <Text fontSize={'lg'} color={'gray.600'}>
             Submit data in the given form ✌️
           </Text>
         </Stack>
        <Box rounded={'lg'} bg={'whitesmoke'} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <HStack>
              <FormControl id="name" isRequired>
                <FormLabel color={'gray'}>Name</FormLabel>
                <Input
                  type="text"
                  border={'1px solid gray'}
                  color={'black'}
                  focusBorderColor={'black'}
                  _hover={{ border: '1px solid ' }}
                  onChange={handleChange}
                  name="name"
                  value={employeeData.name}
                />
              </FormControl>

              <FormControl id="dob" isRequired>
                <FormLabel color={'gray'}>DOB</FormLabel>
                <Input
                  type="text"
                  border={'1px solid gray'}
                  color={'black'}
                  placeholder="YYYY-MM-DD"
                  _placeholder={{ opacity: 0.4, color: 'black' }}
                  focusBorderColor={'black'}
                  _hover={{ border: '1px solid ' }}
                  onChange={handleChange}
                  name="dob"
                  value={employeeData.dob}
                />
              </FormControl>
            </HStack>
            <FormControl id="phoneNumber" isRequired>
              <FormLabel color={'gray'}>Phone Number</FormLabel>
              <Input
                type="number"
                color={'black'}
                border={'1px solid gray'}
                focusBorderColor={'black'}
                _hover={{ border: '1px solid ' }}
                onChange={handleChange}
                name="phoneNumber"
                value={employeeData.phoneNumber}
              />
            </FormControl>

            <FormControl id="experience" isRequired>
              <FormLabel color={'gray'}>Experience</FormLabel>
              <Input
                type="number"
                focusBorderColor={'black'}
                _hover={{ border: '1px solid ' }}
                color={'black'}
                border={'1px solid gray'}
                placeholder="Experience (No.of Years)"
                onChange={handleChange}
                name="experience"
                value={employeeData.experience}
              />
            </FormControl>

            <FormControl id="category" isRequired>
              <FormLabel color={'gray'}>Category</FormLabel>
              <Select 
               color={"black"}
               border={"1px solid gray"}
               onChange={handleChange}
                name="category"
                value={employeeData.category}
               _hover={{border:'1px solid gray' , cursor:'pointer'}}>
                <option value="" style={{color:'white'}}>Select Category</option>
                <option value="stylist" style={{color:'white'}}>Stylist</option>
                <option value="helper" style={{color:'white'}}>Helper</option>
                <option value="other" style={{color:'white'}}>Other</option>
</Select>
            </FormControl>
            <FormControl id="salary" isRequired>
              <FormLabel color={'gray'}>Salary</FormLabel>
              <InputGroup>
              <InputLeftAddon children='₹' bg={'#121212'} color={'teal.300'}/>
              <Input
                type="number"
                focusBorderColor={'black'}
                _hover={{ border: '1px solid ' }}
                color={'black'}
                border={'1px solid gray'}
                placeholder="Experience (No.of Years)"
                onChange={handleChange}
                name="salary"
                value={employeeData.salary}
              />
              </InputGroup>
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
                onClick={handleDataEmployee}
                // onClick={()=>{console.log(employeeData)}}
                isDisabled={disabled}
              >
                Save&nbsp;&nbsp;<BsFillSendPlusFill />
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
