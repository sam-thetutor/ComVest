import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
const SharedDashboardLayout = () => {
  return (
    <>
      <Suspense fallback={<div>loading ....</div>}>
        <Outlet />
        <Footer />
      </Suspense>
    </>
  );
};

export default SharedDashboardLayout;
