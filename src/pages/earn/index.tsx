import EarnPage from "../../components/EarnPage";
import Header from "../../components/Header";
import DashboardLayout from "../../layouts/dashboard";

export default function Earn() {
  return (
    <>
      <Header text="User Dashboard" subtitle="Check your earnings and more!" />
      <EarnPage />
    </>
  );
}
Earn.getLayout = (currentPage) => <DashboardLayout>{currentPage}</DashboardLayout>;
