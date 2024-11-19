import { EventsProvider } from "./hooks/EventsContext"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <EventsProvider>
          {children}
        </EventsProvider>
      </body>
    </html>
  );
}
