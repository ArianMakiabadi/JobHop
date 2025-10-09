import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import CompleteProfile from "./pages/CompleteProfile";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AppLayout from "./UI/AppLayout";
import EmployerDashboard from "./pages/EmployerDashboard";
import Projects from "./pages/Projects";
import Project from "./pages/Project";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Routes>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/complete-profile" element={<CompleteProfile />}></Route>
        <Route path="/employer" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<EmployerDashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<Project />} />
        </Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
