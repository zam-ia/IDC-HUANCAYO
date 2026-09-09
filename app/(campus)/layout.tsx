import CampusLayout from "@/components/layouts/CampusLayout";
import CampusSessionProvider from "@/components/campus/CampusSessionProvider";
import { getAuthSession } from "@/lib/session";

export default async function CampusGroupLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();
  return (
    <CampusSessionProvider session={session}>
      <CampusLayout session={session}>{children}</CampusLayout>
    </CampusSessionProvider>
  );
}
