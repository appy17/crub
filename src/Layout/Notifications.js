import React, { useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Tag,
  Text,
  Divider,
  Box,
} from "@chakra-ui/react";
import { MdOutlineNotifications } from "react-icons/md";
import axios from "axios";

export default function Notifications() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [readNotifications, setReadNotifications] = useState([]);
//   const [notiArray, setNotiArray] = useState([]);


  const loadData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/backend/getProducts.php"
      );
      const data = response.data.phpresult;
      setData(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const loadData1 = async () => {
    try {
      const response = await axios.get(
        "http://localhost/backend/getClientData.php"
      );
      const data = response.data.phpresult;
      setData1(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
    loadData1();
  }, []);

//   useEffect(() => {
//     if (data && data1) {
      
//       setNotiArray(productAlert.concat(clientBdy));
//     }
//   }, [data, data1]);
  const productAlert = data.filter((i) => i.quantity <= 5);
      const clientBdy = data1.filter((i) => isBirthdayToday(i.dob));
const notiArray = [...productAlert , ...clientBdy]
  function isBirthdayToday(dob) {
    const currentDate = new Date();
    const birthDate = new Date(dob);

    return (
      currentDate.getDate() === birthDate.getDate() &&
      currentDate.getMonth() === birthDate.getMonth()
    );
  }

  const markAllNotificationsAsRead = () => {
    const allIndices = notiArray.map((_, index) => index);
    setReadNotifications(allIndices);
  };

  return (
    <Menu >
      <MenuButton as={Button} float={"right"} m={3} color={"black"}>
        <IconButton
          icon={<MdOutlineNotifications fontSize={"30px"} />}
          color=""
          _after={{
            position: "absolute",
            left: "50%",
            bottom: "50%",
            content: '" "',
            height: "10px",
            width: "10px",
            fontSize: "13px",
            color: "white",
            background:
              readNotifications.length === notiArray.length  ? "" : "teal",
            borderRadius: "50%",
            padding: "2px",
          }}
        />
      </MenuButton>
      <MenuList
        bg={"#f5f5f5"}
        color={"black"}
        overflow={'hidden'}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "teal",
            borderRadius: "24px",
          },
        }}
        boxShadow={"none"}
        border={"1px solid #d2dd2d2"}
      >
        {notiArray.length === 0 ? (
          " "
        ) : (
          <Box overflow={'hidden'}>
            {notiArray.map((notification, index) => (
              <MenuItem
                key={index}
                bg={
                  readNotifications.includes(index)
                    ? "transparent"
                    : "#f6f6f6"
                }
                p={5}
                transition={'ease-in 0.3s'}
                borderBottom={readNotifications.includes(index) ? "1px solid #d2d2d2" : '1px solid teal'}
              >
                {notification.category ? (
                  <>
                    📪{notification.name} has only{" "}
                    {notification.quantity} quantity left
                  </>
                ) : (
                  <Text display={"flex"} flexDirection={"column"}>
                    🥳 Today is {notification.name}'s Birthday send them
                    wishes
                    <br />
                    <Button colorScheme="yellow" ml={3} mt={2} w={"20%"}>
                      Send
                    </Button>
                  </Text>
                )}
              </MenuItem>
            ))}
            <Divider />
            {readNotifications.length === notiArray.length ? (
              ""
            ) : (
              <Tag
                color={"whitesmoke"}
                bg={"#121212"}
                onClick={markAllNotificationsAsRead}
                cursor={"pointer"}
                m={3}
                transition={'ease-in 0.3s'}
              >
                Read All
              </Tag>
            )}
          </Box>
        )}
      </MenuList>
    </Menu>
  );
}
