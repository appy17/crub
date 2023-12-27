import { Box, Button, Text , Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor, } from "@chakra-ui/react";
import React from "react";
import { TbScissorsOff } from "react-icons/tb";
import { useAppContext } from "../components/context/AppContext";

export default function Nav() {
  const { logout} = useAppContext();
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
      <Popover>
  <PopoverTrigger>
    <Button float={'right'} 
       mt={2} color={'red'} bg={'red.50'}>Log Out</Button>
  </PopoverTrigger>
  <PopoverContent >
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Really Want to Logout ? </PopoverHeader>
    <PopoverBody><Button colorScheme="red" onClick={logout}>Exit</Button></PopoverBody>
  </PopoverContent>
</Popover>
    </Box>
  );
}
