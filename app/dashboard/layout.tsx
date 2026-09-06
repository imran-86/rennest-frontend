
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./_components/DashboardSidebar";
import Navbar from "@/components/shared/navbar";
import { getMe } from "../service/getMe";

const DashboardLayout = async ({
  children
}: {
  children: React.ReactNode
}) => {
  const user = await getMe();
  // console.log("User Profile ",user.data?.name);
  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* <Navbar user={user.data} /> */}
      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar user={user.data} />
          <main className="flex-1 min-w-0 overflow-y-auto">
            <div className="container mx-auto p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;