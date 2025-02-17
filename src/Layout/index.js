import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Side from './Side'
import { Box, Flex, Text } from '@chakra-ui/react'
import Calender from '../components/Calender'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../components/context/AppContext'

export default function Layout() {
  const { authUser} = useAppContext();
 const navigate = useNavigate();
 const location = useLocation();
 const local = JSON.parse(localStorage.getItem('session'));
useEffect(()=>{
  if(!local == true){
    navigate('/');
  }

},[local])

  return (
    <Box bg={'white'}>
   <Nav/>
   <Flex  w="full" maxW="full" >
   <Side/>
      <Box w={'full'} overflow={'auto'}>
      {/* <Text color={'teal'} >"Hello"</Text> */}

        <Outlet/>
      </Box>
   </Flex>
   </Box>
  )
}
