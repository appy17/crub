// Import necessary Chakra UI components and functions
import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Center,
  Switch,
  Tag,
  extendTheme,
  Button,
  useToast,
} from '@chakra-ui/react';

import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import axios from 'axios';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    // Add any container styles you need
  },
  thumb: {
    bg: 'white',
  },
  track: {
    bg: 'gray.200',
    _checked: {
      bg: 'blue.300', // Change to the desired color when the switch is checked
    },
  },
});

const switchTheme = defineMultiStyleConfig({
  baseStyle,
});

// Apply the theme at the top level of your component hierarchy
const theme = extendTheme({
  components: {
    Switch: switchTheme,
  },
});

// ... (previous imports and code)

export default function Settings() {
  const [isGstOn, setIsGstOn] = useState(false);
  const toast = useToast();
  
  const handleSwitchChange = (e) => {
    setIsGstOn(e.target.checked);
  };

  const handleChange = () => {
    const permiList = {
      gst: isGstOn ? 1 : 0,
    };

    axios
      .post("http://localhost/backend/uPermission.php", permiList)
      .then((response) => {
        console.log("Data created:", response.data);
        toast({
          position: 'top-left',
          title: 'Permission Updated',
          status: 'success',
        });
      })
      .catch((error) => {
        console.error("Error creating data:", error);
      });
  };

  const [pData, setPData] = useState([]);
  const dbpath1 = "http://localhost/backend/";

  const loadPData = async () => {
    try {
      const response = await axios.get(dbpath1 + "getSPermision.php");
      const employeedata = response.data.phpresult;
      
      setPData(employeedata);

      // Set the initial state based on the fetched data
      const hasGstPermission = employeedata.some((i) => i.name === 'gst' && i.status === '1');
      setIsGstOn(hasGstPermission);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadPData();
  }, []);

  console.log('permissiondata', pData);

  return (
    <ChakraProvider theme={theme}>
      <Center>
        <Box maxW={'100%'}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color={'black'}>Access</Th>
                  <Th color={'black'}>Status</Th>
                  <Th color={'black'}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pData.map((i) => (
                  <Tr key={i.name}>
                    <Td color={'black'}>
                      <Tag bg={isGstOn ? 'teal.300' : 'red.400'} color={'gray.900'}>
                        {i.name.toUpperCase()}
                      </Tag>
                    </Td>
                    <Td color={'black'}>{isGstOn ? 'On' : 'Off'}</Td>
                    <Td color={'black'}>
                      <Switch size="md" onChange={handleSwitchChange} isChecked={isGstOn} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <TableCaption>
                <Button colorScheme='cyan' onClick={handleChange}>
                  Update
                </Button>
              </TableCaption>
            </Table>
          </TableContainer>
        </Box>
      </Center>
    </ChakraProvider>
  );
}

