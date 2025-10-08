import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import CompleteProfile from "./pages/CompleteProfile";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AppLayout from "./UI/AppLayout";
import Employer from "./UI/Employer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Routes>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/complete-profile" element={<CompleteProfile />}></Route>
        <Route element={<AppLayout />}>
          <Route path="/employer" element={<Employer />} />
        </Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
