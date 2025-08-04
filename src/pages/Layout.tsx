import Sidebar from "./callable/Sidebar";
import Navbar from "./callable/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-muted text-foreground">
      {/* Sidebar fixée */}
      <aside className="w-45 h-full border-r bg-background fixed left-0 top-0 z-20">
        <Sidebar />
      </aside>
      <div className="ml-45 flex flex-col flex-1 h-80dvh overflow-hidden">
        <header className="sticky top-0 z-10 bg-background border-b">
          <Navbar />
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
