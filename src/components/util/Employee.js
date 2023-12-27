import React, { useState, useEffect } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Center,
  VStack,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
} from "@chakra-ui/react";
import {BsPersonFillAdd} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import axios from "axios";


const Data2 = ({ spell ,onStylistSelect , onData2Select }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [displays, setDisplays] = useState("block");
  const [tagValues, setTagValues] = useState([]); 
  // const [done , setdone] = useState(false);

  // const toggleItem = (item) => {
  //   let updateItem;
  //   if (selectedItems.includes(item)) {
  //     setSelectedItems(selectedItems.filter((i) => i !== item));
  //     // onData2Select(selectedItems);
      
  //     setDisplays("block");
  //   } else {
  //     setSelectedItems([...selectedItems, item]);
      
  //     setDisplays("none");
      

  //   }

  // };
  // 
  const toggleItem = (item) => {
    let updatedItems;
    if (selectedItems.includes(item)) {
      updatedItems = selectedItems.filter((i) => i !== item);
      setDisplays("block");
    } else {
      updatedItems = [...selectedItems, item];
      setDisplays("none");
    }
  
    // Pass the updated selected items to the callback
  
    // Update the state with the new selected items
    setSelectedItems(updatedItems);
  };
  
  // 
  // employeeData = selectedItems;
  // let data2 = selectedItems;
  // console.log( "XYZ:" + employeeData);

  useEffect(() => {
    // Enable or disable the button in the first dropdown based on selected items
    if (selectedItems.length === 0) {
      spell(true);
       // Disable the button
    } else {
      spell(false);
      // data = selectedItems;
      // console.log('This is data :' + selectedItems);
     // Enable the button
    }
    onStylistSelect(selectedItems.length > 0);
  }, [selectedItems, spell ]);
  const dbpath1 = "http://localhost/backend/";

const [Edata, setEData] = useState([]);

  const loadEmployeeData = async () => {
    try {
      const response = await axios.get(dbpath1 + "getEmployeedata.php");
      const Employeedata = response.data.phpresult;
      setEData(Employeedata);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    loadEmployeeData(); // Call the loadData function when the component mounts
  }, []);
  useEffect(() => {
    const values = selectedItems.map((item) => item);
    setTagValues(values);
    onData2Select(values);

  }, [selectedItems]);
  console.log("tag Values:"+ tagValues)

  return (
    <Center>
      <Menu>
      {({ isOpen }) => (
    <>
        <MenuButton
        isActive={isOpen}
          as={Button}
          width={"fit-content"}
          h={"fit-content"}
          // p={2}
          p={3}
          borderRadius={'10px'}
          textAlign={"center"}
          display={displays}
          // rightIcon={isOpen ? 'x' : <BsPersonFillAdd/>}
          fontSize={'small'}
          bg={'gray.800'}
          // mb={4}
          
        >
          {isOpen ? <AiOutlineClose/> : <BsPersonFillAdd/>}
        </MenuButton>
        <MenuList>
          {Edata.map((item) => (
            <MenuItem key={item.id}>
              <Checkbox
                isChecked={selectedItems.includes(item.name)}
                onChange={() => toggleItem(item.name)}
              >
                {item.name}
              </Checkbox>
            </MenuItem>
          ))}
        </MenuList>
        </>
  )}
      </Menu>

      <VStack spacing={4}>
        {tagValues.map((item) => (
          <HStack>
            <Tag
              size={"lg"}
              key={item}
              borderRadius="full"
              variant="subtle"
              colorScheme="gray"
              // border={'1px solid teal'}
              // mb={4}
              
            >
            <TagLabel value={item}>{item}</TagLabel>
        {/* <TagLabel>{employeeData[item]}</TagLabel> */}
              {/* <TagCloseButton onClick={() => toggleItem(item)} /> */}
            </Tag>
          </HStack>
        ))}
      </VStack>
    </Center>
  );
};

export default Data2;