import React, { useEffect, useState } from "react";
import { Link as RouteLink, useLocation, useNavigate } from "react-router-dom";
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
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  PinInput,
  PinInputField,
  Collapse,
  Tag,
  ColorModeProvider,
} from "@chakra-ui/react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { TbScissorsOff } from "react-icons/tb";
import { FaUserShield } from "react-icons/fa6";
import { BiLogInCircle } from "react-icons/bi";
import { MdLockClock } from "react-icons/md";
import { useAppContext } from "./context/AppContext";
import axios from "axios";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen1, setOpen1] = useState("0%");
  const [isOpen2, setOpen2] = useState("100%");
  const [isOpen3, setOpen3] = useState("200%");
  const [dis, setdis] = useState("flex");
  const [dis2, setdis2] = useState("none");
  const [dis3, setdis3] = useState("none");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ency, setEncy] = useState("");
  const [uEm, setUEm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const toast = useToast()

  function test2() {
    setOpen3("0%");
    setOpen2("-100%");
    setTimeout(() => {
      setdis2("none");
      setdis3("flex");
    }, 520);
  }
  //  const [data , setdata] = useState({definde_id : '' , key_secret : ''});

  const isButtonDisabled = email === "" || password === "";
  const { authUser, login, loading } = useAppContext();
  const navigate = useNavigate();
  const toast = useToast();
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
    login(email, ency);
    e.preventDefault(); // Prevents the default form submission behavior
    // Your login logic here

    setEmail("");
    setPassword("");
    setEncy("");
  };
  // console.log(authUser);
  useEffect(() => {
    if (authUser) {
      navigate("/calender");
    }
  }, [authUser]);
  const [access, setAccess] = useState([]);
  const loadData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/backend/getAccess.php"
      );
      const data = response.data.phpresult;
      setAccess(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  const click = async () => {
    let filter = access.find((i) => i.defined_id == uEm);
    try {
      const response = await axios.post("http://localhost/backend/opt.php", {
        updatedEmail: uEm,
      });
      console.log(response.data);
      if (filter && response.data) {
        setOpen1("-100%");
        setOpen2("0%");
        setTimeout(() => {
          setdis("none");
          setdis2("flex");
        }, 520);
        toast({
          title: "Found",
        });
      } else {
        toast({
          title: "Not Found",
          status: "error",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
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
                    bg: "teal",
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
                isLoading={loading}
              >
                Login <BiLogInCircle />
              </Button>
              <Text display={"flex"} fontSize={"smaller"} color={"#121212"}>
                <Text
                  color={"gray"}
                  // onClick={onOpen} the password box ?
                  cursor={"pointer"}
                  _hover={{ color: "#121212", textDecoration: "underline" }}
                  transition={"ease-in 0.3s"}
                >
                  Forgot Password ?
                </Text>
                {/* <FaUserShield /> */}
              </Text>
            </VStack>
          </form>
        </Box>
      </Stack>
      {/* Password Reset Form */}
      <ColorModeProvider
        options={{ initialColorMode: "light", useSystemColorMode: false }}
      >
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={"md"}>
          <ModalOverlay />
          <ModalContent bg={"#191919"}>
            <ModalHeader display={"flex"}>
              Password Reset <MdLockClock color="yellow" />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowX={"hidden"} display={"flex"}>
              {/* <Box w={'100%'} h={'fit-content'}  > */}
              <Box
                w={"100%"}
                marginLeft={isOpen1}
                display={dis}
                transition={"ease-in 0.5s"}
                justifyContent={"space-between"}
              >
                <Input
                  type="email"
                  placeholder="Email"
                  colorScheme="telegram"
                  value={uEm}
                  onChange={(e) => {
                    setUEm(e.target.value);
                  }}
                />
                <Button colorScheme="cyan" onClick={click} ml={3}>
                  Send
                </Button>
              </Box>
              <Box
                w={"100%"}
                pos={"relative"}
                display={dis2}
                left={isOpen2}
                transition={"ease-in 0.5s"}
              >
                <VStack>
                  <HStack>
                    <PinInput>
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                    <Button colorScheme="cyan" onClick={test2} ml={10}>
                      {" "}
                      Next
                    </Button>
                    <br />
                  </HStack>
                  <Tag alignSelf={"baseline"}> Pin Expires in 30 seconds !</Tag>
                </VStack>
              </Box>
              <Box
                w={"100%"}
                marginLeft={isOpen3}
                display={dis3}
                flexDirection={"column"}
                gap={"10px"}
                transition={"ease-in 0.5s"}
              >
                <Input type="email" placeholder="Email" />
                <Input type="email" placeholder="Email" />

                <Button colorScheme="cyan">Next</Button>
              </Box>
              {/* </Box> */}
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </ColorModeProvider>

      <Text>&copy;2024 | Royals Webtech</Text>
    </Container>
  );
};

export default Login;
