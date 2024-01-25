// Import necessary Chakra UI components and functions
import React from 'react';
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
} from '@chakra-ui/react';

import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

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

export default function Settings() {
  return (
    <ChakraProvider theme={theme}>
      <Center>
        <Box maxW={'100%'} >
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th color={'black'}>Access</Th>
                  <Th color={'black'}>Status</Th>
                  <Th color={'black'}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td color={'black'}>
                    <Tag bg={'gray.200'} color={'gray.900'}>
                      GST
                    </Tag>
                  </Td>
                  <Td color={'black'}>Off</Td>
                  <Td color={'black'}>
                    <Switch size="md" />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Center>
    </ChakraProvider>
  );
}
