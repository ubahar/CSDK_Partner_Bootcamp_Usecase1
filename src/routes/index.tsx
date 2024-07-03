import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";

// layouts
import DefaultLayout from "../layout/Default";

// components
import Root from "./Root";

// lazy load all the views

// pages
const Home = React.lazy(() => import("../pages/usecase1"));
const Page1 = React.lazy(() => import("../pages/usecase1_step2"));

const loading = () => <div className=""></div>;

//const config = (window as { [key: string]: any })["embedApp_config"];

type LoadComponentProps = {
  component: React.LazyExoticComponent<() => JSX.Element>;
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
  <Suspense fallback={loading()}>
    <Component />
  </Suspense>
);

const AllRoutes = () => {
  return useRoutes([
    // { path: "/", element: <Root /> },
    { path: "/", element: <Home /> },
    {
      // public routes
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: "page1",
          // element: <LoadComponent component={Home} />,
          element: <Page1 />,
        },
      ],
    },
  ]);
};

export { AllRoutes };
