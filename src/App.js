import { RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import { ChakraProvider } from "@chakra-ui/react";
import { router } from "./lib/route";
import Side from "./Layout/Side";
import Nav from "./Layout/Nav";
import { AppProvider } from "./components/context/AppContext";

function App() {
  return (
    // <AppProvider>

    <div className="App">
      <ChakraProvider>
        <RouterProvider router={router}>
          <Layout>
            <Side />
            <Nav />
          </Layout>
        </RouterProvider>
      </ChakraProvider>
    </div>
    // </AppProvider>
  );
}

export default App;
