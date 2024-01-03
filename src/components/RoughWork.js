import React, { useState } from 'react';
import {
  ChakraProvider,
  CSSReset,
  Box,
  Radio,
  RadioGroup,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

export default function Test() {
  // State to store the selected radio value and checkboxes
  const [value, setValue] = useState({ radioValue: '', checkboxesValue: [] });

  // State to store the array of objects
  const [arrayOfObjects, setArrayOfObjects] = useState([]);

  // Function to handle radio button change
  const handleRadioChange = (radioValue) => {
    setValue({ radioValue, checkboxesValue: [] });
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (checkboxValue) => {
    if (!value.radioValue) {
      alert('Please select a radio button first!');
      return;
    }

    // Check if the checkbox is already checked
    if (value.checkboxesValue.includes(checkboxValue)) {
      // If checked, remove the checkbox value from the state
      setValue((prevValue) => ({
        ...prevValue,
        checkboxesValue: prevValue.checkboxesValue.filter((value) => value !== checkboxValue),
      }));

      // Also remove the corresponding object from the array
      setArrayOfObjects((prevArray) =>
        prevArray.filter((obj) => !(obj.radioValue === value.radioValue && obj.checkboxValue === checkboxValue))
      );
    } else {
      // If not checked, add the checkbox value to the state
      setValue((prevValue) => ({
        ...prevValue,
        checkboxesValue: [...prevValue.checkboxesValue, checkboxValue],
      }));

      // Create a new object for the selected radio value and checkbox value
      const selectedObject = {
        radioValue: value.radioValue,
        checkboxValue: checkboxValue,
      };

      // Add the new object to the array
      setArrayOfObjects((prevArray) => [...prevArray, selectedObject]);
    }
  };

  return (
    <Box p={5} color={'white'} bg={'#121212'}>
      <RadioGroup value={value.radioValue} onChange={(value) => handleRadioChange(value)}>
        {/* Radio buttons */}
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>

      <br />

      {/* Checkboxes */}
      <Checkbox
        value="checkbox1"
        isChecked={value.checkboxesValue.includes('Checkbox 1')}
        onChange={() => handleCheckboxChange('Checkbox 1')}
      >
        Checkbox 1
      </Checkbox>
      <Checkbox
        value="checkbox2"
        isChecked={value.checkboxesValue.includes('Checkbox 2')}
        onChange={() => handleCheckboxChange('Checkbox 2')}
      >
        Checkbox 2
      </Checkbox>
{/*  */}
      <br />

      {/* Display data in table */}
      <Table variant="simple" mt={5} color={'white'}>
        <Thead>
          <Tr>
            <Th>Radio Value</Th>
            <Th>Checkbox Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {arrayOfObjects.map((obj, index) => (
            <Tr key={index}>
              <Td>{obj.radioValue}</Td>
              <Td>{obj.checkboxValue}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
