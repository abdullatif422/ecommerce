import Sidenav from "../ui/dashbaord/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidenav />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
