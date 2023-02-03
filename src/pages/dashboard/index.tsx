import Header from "../../components/Header";
import UserDashboard from "../../components/UserDashboard";
import DashboardLayout from "../../layouts/dashboard";

export default function Dashboard() {
  return (
    <>
      <Header text="User Dashboard" subtitle="Check your earnings and more!" />
      <UserDashboard />
    </>
  );
}
Dashboard.getLayout = (currentPage) => <DashboardLayout>{currentPage}</DashboardLayout>;
