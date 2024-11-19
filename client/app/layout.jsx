import { SessionProvider } from "next-auth/react";

export default async function Layout({ children }) {
  const session = await getServerSession();
  return (
    <html>
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
