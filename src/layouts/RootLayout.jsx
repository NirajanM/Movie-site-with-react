import Header from "../components/header";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <Header />
      <div className="px-4 lg:px-0">
        <Outlet />
      </div>
    </>
  );
}
