import React, { useState } from "react";
import {Link as RouteLink, useNavigate} from 'react-router-dom'
import {
  Container,
  Box,
  FormLabel,
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  VStack,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { TbScissorsOff } from "react-icons/tb";
import { FaUserShield } from "react-icons/fa6";
import { BiLogInCircle } from "react-icons/bi";
import { useAppContext } from "./context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ency, setEncy] = useState("");
  const [showPassword, setShowPassword] = useState(false);
//  const [data , setdata] = useState({definde_id : '' , key_secret : ''});
  const isButtonDisabled = email === "" || password === "";
  const { authUser , login , loading} = useAppContext();
 const navigate = useNavigate();

  const encryption = (inputValue) => {
    const encryptedValue =
      "*" +
      inputValue.length * 21 +
      "!@" +
      "_" +
      inputValue.length.toString(2) +
      10 +
      "$" +
      inputValue.length * 1007 +
      "^" +
      inputValue
        .split("")
        .map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
        .join("");
    setEncy(encryptedValue);
  };

  const handleLogin = (e) => {
    // setdata({
    //   definde_id : email,
    //   key_secret : ency
    // })
    login(email,ency);
    e.preventDefault(); // Prevents the default form submission behavior
    
    // Your login logic here
    console.log({email : email , pass : ency});
    setEmail("");
    setPassword("");
    setEncy('')
  };
  // console.log(authUser);
  if(authUser){
    navigate('/calender');
  }
  console.log(`loading : ${loading}`);
  return (
    <Container
      maxW="full"
      p={{ base: 5, md: 10 }}
      bg={"whitesmoke"}
      h={"100dvh"}
    >
      <Stack
        spacing={4}
        maxW={{ base: "20rem", sm: "25rem" }}
        margin="0 auto"
        color={"#121212"}
      >
        <Stack align="center" spacing={2}>
          <Heading
            display={"flex"}
            fontSize={{ base: "xl", sm: "3xl" }}
            fontWeight={"hairline"}
            fontFamily={"monospace"}
          >
            Krub Salon <TbScissorsOff />
          </Heading>
          <Text
            fontSize={"xl"}
            fontWeight={"hairline"}
            fontFamily={"monospace"}
          >
            Login
          </Text>
        </Stack>

        <Box pos="relative" mt={3}>
          <Box
            pos="absolute"
            top="-7px"
            right="-7px"
            bottom="-7px"
            left="-7px"
            rounded="lg"
            bgGradient="linear-gradient(to left, #e7eaed, #b4ceff, #edf4ff);"
            transform="rotate(-5deg)"
          ></Box>
          <form onSubmit={handleLogin} autoComplete="off">
            <VStack
              pos="relative"
              spacing={8}
              p={6}
              bg={"whitesmoke"}
              rounded="lg"
              boxShadow="lg"
              color={"black"}
            >
              <FormControl id="email" isRequired>
                <FormLabel>Email/Username</FormLabel>
                <Input
                  type="email"
                  placeholder="Email or Username"
                  rounded="md"
                  border={"1px dashed gray"}
                  _hover={{
                    border: "1px dashed #121212",
                  }}
                  _focus={{
                    border: "1px solid teal",
                  }}
                  _autofill={{
                    bg:'teal'
                  }}
                  _placeholder={{ color: "gray" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    rounded="md"
                    border={"1px dashed gray"}
                    _hover={{
                      border: "1px dashed #121212",
                    }}
                    _focus={{
                      border: "none",
                    }}
                    _placeholder={{ color: "gray" }}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      encryption(e.target.value);
                    }}
                  ></Input>
                  <InputRightElement>
                    <IconButton
                      variant={"solid"}
                      color={"black"}
                      icon={showPassword ? <GoEyeClosed /> : <GoEye />}
                      onClick={() => setShowPassword(!showPassword)}
                      borderRadius={"none"}
                      borderLeft={"1px solid gray"}
                      p={1}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                bg="twitter.600"
                color="white"
                _hover={{
                  bg: "blue.500",
                  letterSpacing: 1,
                }}
                rounded="md"
                w="100%"
                transition={"ease-in 0.1s"}
                type="submit"
                isDisabled={isButtonDisabled}
                // as={RouteLink}
                // to= { authUser == true ? '/calender': ''}
                isLoading = {loading}
              >
                Login <BiLogInCircle />
              </Button>
              <Text display={"flex"} fontSize={"smaller"} color={"#121212"}>
                <Text color={"gray"}>Forgot Password ?</Text>&nbsp;Contact IT
                Support&nbsp;
                <FaUserShield />
              </Text>
            </VStack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
