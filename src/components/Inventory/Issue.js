import { Box, Divider, Flex, FormLabel, HStack, Input, Select, Text , Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  useToast,
  Center, } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaBoxOpen } from "react-icons/fa";
export default function Issue(props) {
  const [Edata, setEData] = useState([]);
  const dbpath1 = "http://localhost/backend/";
 const toast = useToast();

  const {id , size , name , type} = props.data;
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
  const [usedBy, setUsedBy] = useState("");
    const [usedTo, setUsedTo] = useState("");
    const [qty , setQty] = useState(null);
    const [datei , setdatei] = useState(new Date().toISOString().split('T')[0]);


  const insertData = () => {
    
    const issuData = {
      date: datei == '' ? new Date().toISOString().split('T')[0] : datei,
      p_name : datei == '' ? new Date().toISOString().split('T')[0] : datei + '|' + name , 
      quantity : qty,
      issued_by : usedBy,
      issued_to : usedTo,
      consumption : 0 ,
      original : size ,
      product_id : id , 
      isDone : 0,
      u_id : `${id}@${!data ? 1 : data.length+1}`

    }
    axios
    .post("http://localhost/backend/addIssue.php", issuData)
    .then((response) => {
      console.log("Data created:", response.data);
       toast({
        position:'top-right',
        title:'Added !',
        status:'success'
       })
      // You might want to do something after a successful submission
    })
    .catch((error) => {
      console.error("Error creating data:", error);
    });

  }

  const [data, setdata] = useState([]);
const fetchData = async () => {
  try {
    const response = await axios.get(
      `http://localhost/backend/getIssue.php?id=${id}`
    );
    setdata(response.data.phpresult?.reverse());
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

useEffect(() => {
  fetchData();
}, [id ]); 
const [disabled , setDisabled] = useState(true);
useEffect(() => {
  setDisabled(datei === "" || usedBy === "" || usedTo === "" || qty === '');
}, [datei, usedBy, usedTo , qty]);
let checkOpen = data?.some((i)=> i.isDone == 0);
console.log(checkOpen);

// console.log(data ? data[0] : '')
  return (
    <>
    {type == 'c' ? <Box w={'100%'}>
      <HStack 
        gap={'7px'} color={'black'}><Flex flexDirection={"column"}>
                  <FormLabel color={"gray.600"} fontWeight={"light"}  fontSize={'sm'}>
                    Date
                  </FormLabel>
                  <Input
                    border={"1px solid gray"}
                    _placeholder={{ color: "gray" }}
                    _hover={{ border: "1px solid black" }}
                    cursor={"pointer"}
                    color={"#121212"}
                    type='date'
                    bg='#d2d2d2'
                    value={datei}
                    onChange={(e)=>{setdatei(e.target.value)}}
                  />
                </Flex>
                <Flex flexDirection={"column"}>
                  <FormLabel color={"gray.600"} fontWeight={"light"}  fontSize={'sm'}>
                    Qty
                  </FormLabel>
                  <Input
                    border={"1px solid gray"}
                    placeholder='Quantity'
                    _placeholder={{ color: "gray" }}
                    _hover={{ border: "1px solid black" }}
                    cursor={"pointer"}
                    color={"#121212"}
                    type='number'
                    value={qty}
            onChange={(e) => setQty(e.target.value)}
                  />
                </Flex>
      <Flex flexDirection={"column"}>
                  <FormLabel color={"gray.600"} fontWeight={"light"}  fontSize={'sm'}>
                    Issued By
                  </FormLabel>
                  <Select
                    placeholder="Select"
                    border={"1px solid gray"}
                    value={usedBy}
                    onChange={(e) => setUsedBy(e.target.value)}
                    _hover={{ border: "1px solid black" }}
                  >
                  {Edata.map((i)=>(
                    <option value={i.name}  style={{color:'white'}}>{i.name}</option>

                  ))}
                  </Select>
                </Flex>
                <Flex flexDirection={"column"}>
                  <FormLabel color={"gray.600"} fontWeight={"light"}  fontSize={'sm'}>
                    Issued To
                  </FormLabel>
                  <Select
                    placeholder="Select"
                    _pl
                    border={"1px solid gray"}
                    value={usedTo}
            onChange={(e) => setUsedTo(e.target.value)}
                    _hover={{ border: "1px solid black" }}
                  >
                    
                     {Edata.map((i)=>(
                    <option value={i.name} style={{color:'white'}}>{i.name}</option>

                  ))}
                  </Select>
                </Flex>
      </HStack>
                <Flex flexDirection={"column"} >
                
                  <Button 
                 onClick={ insertData }
                  colorScheme='green' mt={7} alignSelf={'flex-end'}
                   isDisabled={disabled}
                   > Submit</Button>
                </Flex>

     
     <HStack mt={5}>
     <Table variant='simple'>
    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
    <Thead borderBottom='1px solid red'>
      <Tr >
        <Th  fontSize={'x-small'}>Date</Th>
        <Th  fontSize={'x-small'}>Issued by</Th>
        <Th  fontSize={'x-small'}>Issued to</Th>
        <Th  fontSize={'x-small'}>Quantity</Th>

         <Th  fontSize={'x-small'}>Orignal</Th>
        <Th  fontSize={'x-small'}>Consumption</Th>
        
        
      </Tr>
    </Thead>
    <Tbody>
      {data?.map((i) => (<Tr>
        <Td fontSize={'smaller'}>{i.date}</Td>
        <Td fontSize={'smaller'}>{i.issued_by}</Td>
        <Td fontSize={'smaller'}>{i.issued_to}</Td>
        <Td fontSize={'smaller'}>{i.quantity}</Td>
        <Td  fontSize={'smaller'} color={Number(i.original) == Number(i.consumption) ? 'red' : 'black'}>{Number(i.original)}</Td>
        <Td  fontSize={'smaller'} color={Number(i.original) == Number(i.consumption) ? 'red' : 'black'}>{Number(i.original) == Number(i.consumption) ? Number(i.consumption) + ' consumed' : Number(i.consumption) }</Td>



        

        
      
      </Tr>))}
    </Tbody>
  </Table>

     </HStack>
    </Box>  : <Center color={'gray.300'}> <FaBoxOpen />&nbsp;Nothing To Preview </Center>}
    </>
  )
}
