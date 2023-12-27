import { AbsoluteCenter, Center, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'

export default function ErrorP() {
  return ( <>
  

    <Center pos={'relative'} top={'27%'}>
  <Text   position={'absolute'} fontSize={'4xl'} zIndex={9} fontFamily={'monospace'} color={'black'} display={'flex'}><Text  color={'gray'}>404</Text>&nbsp; | Page Not Found</Text>
  <Image src='https://cdni.iconscout.com/illustration/premium/thumb/not-found-4064375-3363936.png' boxSize={'250px'} opacity={0.7}/>
    </Center>
    </>
    )
}
