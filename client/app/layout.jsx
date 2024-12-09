import { Provider } from "./Provider";
import { getServerSession } from "next-auth";

export default async function Layout({ children }) {
  const session = await getServerSession();
  return (
    <html>
      <body>
        <Provider session={session}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
