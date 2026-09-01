import Navbar from "@/components/shared/navbar";

export default function AuthGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  );
}