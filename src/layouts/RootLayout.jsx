import { Suspense } from "react";
import Header from "../components/header";
import BottomTabBar from "../components/BottomTabBar";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import RouteFallback from "../components/RouteFallback";

export default function RootLayout() {
  const location = useLocation();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-toast focus:rounded-md focus:bg-ink-850 focus:px-4 focus:py-2 focus:text-small focus:text-fg-hi"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="pb-20 md:pb-0">
        <Suspense fallback={<RouteFallback />}>
          <div key={location.pathname} className="route-fade">
            <Outlet />
          </div>
        </Suspense>
      </main>
      <BottomTabBar />
      <ScrollRestoration />
    </>
  );
}
