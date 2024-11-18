import { SessionProvider } from "next-auth/react";

export default function Layout({ children, session }) {
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



