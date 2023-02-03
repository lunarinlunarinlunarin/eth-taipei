import CreateAdvert from "../../components/CreateAdvert";
import Header from "../../components/Header";
import UserDashboard from "../../components/UserDashboard";
import DashboardLayout from "../../layouts/dashboard";

export default function Create() {
  return (
    <>
      <Header text="Merchant Dashboard" subtitle="Fuss-free targeted marketing, for cheap" />
      <CreateAdvert />
    </>
  );
}
Create.getLayout = (currentPage) => <DashboardLayout>{currentPage}</DashboardLayout>;
