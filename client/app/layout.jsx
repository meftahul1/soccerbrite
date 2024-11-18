import SessionProvider from "./_components/SessionProvider";
import { getServerSession } from "next-auth";

export default async function Layout({ children }) {
  const session = await getServerSession();
  return (
    <html>
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
