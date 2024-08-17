import { Fragment, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import { privateRoutes, publicRoutes } from "./routes";
import { ThemeProvider } from "@mui/material";
import theme from "./assets/themes/colors";
import { DefaultSidebar } from "./components/modules/DefaultLayout/DefaultSidebar";
import setupAxiosInterceptors from "./utils/setupAxiosInterceptors";
import { useCheckAuthentication } from "./hook/useCheckAuthentication";

setupAxiosInterceptors();

function App() {
  const checkIslogin = useCheckAuthentication();
  useEffect(() => {
    console.log("check", checkIslogin);
  }, [checkIslogin]);
  return (
    <ThemeProvider theme={theme}>
      <div className="md:container mx-auto">
        <ReactQueryDevtools initialIsOpen={false} />
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
          {privateRoutes.map((route, index) => {
            const Layout = route.isShowSidebar ? DefaultSidebar : Fragment;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  checkIslogin ? (
                    <Layout>
                      <route.component />
                    </Layout>
                  ) : (
                    <Navigate to={"/"} />
                  )
                }
              />
            );
          })}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
