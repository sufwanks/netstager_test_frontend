import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import { saveLoginInfo } from "./services/api";
import Success from "./pages/Success";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let bodyFormData = new FormData();
    bodyFormData.append("load", true);
    saveLoginInfo(bodyFormData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setIsLoading(false);
        } else {
          throw response;
        }
      })
      .catch((error) => {
        console.log("test", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <Loading cover="content" backdrop={true} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/final" element={<Success />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </Fragment>
  );
}

export default App;
