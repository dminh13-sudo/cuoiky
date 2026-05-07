import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-lux-bg text-lux-text">
      <AppHeader />
      <div className="min-w-0 flex-1">{children}</div>
      <AppFooter />
    </div>
  );
}
