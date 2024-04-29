import {
  Box,
  Button,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useDisclosure,
  Tag,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TbScissorsOff } from "react-icons/tb";
import { useAppContext } from "../components/context/AppContext";
import Notifications from "./Notifications";

export default function Nav() {
  const { logout } = useAppContext();

 const userName = localStorage.getItem('name');
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <Box
      borderBottom={"1px solid whitesmoke"}
      w={"full"}
      h={"8vh"}
      boxShadow={"2px 0px 5px 0px rgba(170,160,160,0.75);"}
      pos={"sticky"}
      top={0}
      zIndex={9}
      bg={"white"}
    >
      <Button
        leftIcon={<TbScissorsOff />}
        variant={"solid"}
        color={"#48487F"}
        fontWeight={"hairline"}
        fontFamily={"monospace"}
        letterSpacing={2}
        fontSize={"2xl"}
        pos={"relative"}
        left={"5%"}
        mt={2}
      >
        <Text> Krub Salon</Text>
      </Button>
      {/* <Tag colorScheme="red" color={'red'} >You IP Address : {ipAdd}</Tag> */}
      {/*  */}
     <Menu>
  <MenuButton as={Button} float={"right"} m={3} color={'Black'} textAlign={'center'}>
  <Avatar src='https://bit.ly/broken-link'  name={userName}/> 
  </MenuButton>
  <MenuList>
    <MenuItem><Tag p={3}>{userName}</Tag></MenuItem>
    <MenuItem>
      <Tag  onClick={onOpen} p={3} colorScheme="red">
        Log Out
      </Tag>
      </MenuItem>
  </MenuList>
</Menu>
{/* logout alert dailog ! */}
<AlertDialog
        isOpen={isOpen}
      
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              LogOut 
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards !
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button  onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={logout} ml={3}>
                LogOut
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
<Notifications/>
    </Box>
  );
}
