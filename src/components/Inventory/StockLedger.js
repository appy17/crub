import { Box, Button, Center, Spinner } from '@chakra-ui/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function StockLedger() {
  const location = useLocation();

  return (
    <>
    <Box
        color={"black"}
        borderBottom={"1px solid #d2d2d2"}
        w={"full"}
        height={"fit-content"}
        p={2}
        // display={'flex'}

        pos={"sticky"}
        top={0}
      >
        <Button
          color={"black"}
          borderRadius={"none"}
          opacity={0.5}
          as={Link}
          to={'/inventory/products'}
        >
          PRODUCTS
        </Button>
        <Button
          color={"black"}
          borderRadius={"none"}
          borderBottom={location.pathname == '/inventory/stock-ledger' ? "1px solid black" : ''}
        >
          STOCK LEDGER
        </Button>
      </Box>
      <Center color={'black'} mt={'10%'}>
    <Spinner/>
      </Center>
    </>
  )
}
