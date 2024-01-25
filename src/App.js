import { RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { router } from "./lib/route";
import Side from "./Layout/Side";
import Nav from "./Layout/Nav";

function App() {
  return (
    // <AppProvider>

    <div className="App">
      
        <RouterProvider router={router}>
          <Layout>
            <Side />
            <Nav />
          </Layout>
        </RouterProvider>

    </div>
    // </AppProvider>
  );
}

export default App;
