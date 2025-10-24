import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import CompleteProfile from "./pages/CompleteProfile";
import NotFound from "./pages/NotFound";
import EmployerDashboard from "./pages/EmployerDashboard";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import { DarkModeProvider } from "./context/DarkModeContext";
import EmployerLayout from "./features/employer/EmployerLayout";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import Proposals from "./pages/Proposals";
import SubmittedProjects from "./pages/SubmittedProjects";
import FreelancerLayout from "./features/freelancer/FreelancerLayout";
import ProtectedRoute from "./UI/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import AdminLayout from "./features/admin/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import PendingApproval from "./pages/PendingApproval";
import { Home } from "./pages/Home";
import { LearnMore } from "./pages/LearnMore";
import AdminLogin from "./features/authentication/AdminLogin";

const queryClient = new QueryClient();

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Routes>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/complete-profile" element={<CompleteProfile />}></Route>
          <Route
            path="/employer"
            element={
              <ProtectedRoute>
                <EmployerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<EmployerDashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<Project />} />
          </Route>
          <Route
            path="/freelancer"
            element={
              <ProtectedRoute>
                <FreelancerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<FreelancerDashboard />}></Route>
            <Route path="proposals" element={<Proposals />}></Route>
            <Route path="projects" element={<SubmittedProjects />}></Route>
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />}></Route>
            <Route path="users" element={<Users />}></Route>
            <Route path="projects" element={<SubmittedProjects />}></Route>
            <Route path="proposals" element={<Proposals />}></Route>
          </Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/learn-more" element={<LearnMore />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
          <Route path="/unauthorized" element={<Unauthorized />}></Route>
          <Route path="/pending" element={<PendingApproval />}></Route>
          <Route path="/admin-login" element={<AdminLogin />}></Route>
        </Routes>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
