import { Outlet } from "react-router";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import useCourse from "./Hooks/useCourseCaegory";

const App = () => {
  const { loading, error } = useCourse();
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white  ">
      <Header />
      <main className="flex-grow mt-20 shadow-[0_4px_6px_-1px_rgba(255,255,255,0.5),_0_2px_4px_-2px_rgba(255,255,255,0.3)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
