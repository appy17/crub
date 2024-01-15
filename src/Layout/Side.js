import { Box, Button, Center, Select, Show, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { EmailIcon , ArrowForwardIcon } from '@chakra-ui/icons'
import { Route, Link as RouteLink, useLocation} from 'react-router-dom'
import {SlCalender} from 'react-icons/sl'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { BsCaretDownFill } from 'react-icons/bs'
import { BiSolidAddToQueue } from 'react-icons/bi'
import {HiShoppingCart} from 'react-icons/hi';
import {FaUsersLine , FaAngleLeft, FaAngleRight}from 'react-icons/fa6';
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { RiUserStarFill } from "react-icons/ri";
import { FaLock } from 'react-icons/fa'
// import Calenderr from '../components/Calender'
export default function Side() {
  const [dis , setdis] = useState('visible');
  const [dis1 , setdis1] = useState('none');
  const [margin , setmargin] = useState('0');
  const location = useLocation();
 

  

  return (
    <>
    <Box  w={'fit-content'} h={'92vh'} 
          visibility={location.pathname == '/' ? 'hidden' : dis}
          ml={location.pathname == '/' ?"-254px" :margin}
          pos={'sticky'}
          zIndex={99}
          top={'8vh'}
          transition={'ease 0.2s'}
     boxShadow={'2px 5px 5px 0px rgba(170,160,160,0.75);'}
    >
        <Center>
        <Stack direction='column' spacing={4} p={4} pr={10} >
        <Button  color={'black'} variant='ghost' w={'100%'}>
        <Menu border={'1px solid red'}>
  <MenuButton color={'black'} leftIcon={< BsCaretDownFill/>} as={Button}>
    Admin Masters
  </MenuButton>
  
  <MenuList bg={'transparent'} zIndex={'999'}>
    <MenuItem bg={'white'}><Button colorScheme='black' variant={'outline'} rightIcon={<BiSolidAddToQueue/>}
                              as={RouteLink} to={'/Addclient'}>Add Client</Button></MenuItem>
    <MenuItem bg={'white'}><Button colorScheme='black' variant={'outline'}  rightIcon={<BiSolidAddToQueue/>}
                            as={RouteLink} to={'/AddEmployee'}>Add Employee</Button></MenuItem>
    <MenuItem bg={'white'}><Button colorScheme='black' variant={'outline'}  rightIcon={<BiSolidAddToQueue/>}
                            as={RouteLink} to={'/AddProduct'}>Add Products</Button></MenuItem>
    
  </MenuList>

</Menu>
  </Button>
  <Button leftIcon={<LiaFileInvoiceSolid />} as={RouteLink} to='/Invoice'color={'black'}  variant='ghost'>
    Invoice
  </Button>
  <Button  as={RouteLink} to='/calender' leftIcon={<SlCalender />} color={'black'}  variant='ghost'>
    Calender
  </Button>
  <Button as={RouteLink} to='inventory/products' leftIcon={<HiShoppingCart />} color={'black'}  variant='ghost' >
   Inventory
  </Button>
  <Button leftIcon={<FaUsersLine/>} 
      as={RouteLink} to='/client' color={'black'}  variant='ghost'>
    Clients
  </Button>
 
  <Button leftIcon={<RiUserStarFill />} color={'black'}  variant='ghost'
   as={RouteLink} to='/employee'>
    Employee
  </Button>
  <Button leftIcon={<LiaFileInvoiceSolid />} as={RouteLink} to='/test
  'color={'black'}  variant='ghost'>
    Test page
  </Button>
  <Button leftIcon={<EmailIcon />} color={'black'} variant='ghost'>
    Email
  </Button>
  <Button leftIcon={<ArrowForwardIcon />} color={'black'} variant='ghost'>
    Call us
  </Button>
  <Button color={'white'} bg={'black'}
    _hover={{bg:'#121212'}}
      width={'fit-content'}
      alignSelf={'center'}
     zIndex={9}  
     onClick={()=>{
      setdis('hidden')
      setdis1('block')
      setmargin('-254px')
     }}><FaAngleLeft/></Button>
</Stack>

      </Center>
     
    </Box>
    <Button color={'white'} bg={'black'}
    _hover={{bg:'#121212'}}
     zIndex={9} position={'sticky'}
     borderLeftRadius={'none'}
     top={'50%'}
     mt={0}
    //  p={2}
     size={'sm'}
     display={location.pathname == '/' ? "block" : dis1}
     onClick={()=>{
      setdis('visible')
      setdis1('none')
      setmargin('0');
      
     }}
     > {location.pathname == '/' ? <FaLock/> : <FaAngleRight/>}</Button>
    </>
  )
}
