import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'Marian Courses Website',
  description: 'Learn about the courses offered by Maria',
};

// export const user = {
//   username: '',
//   email: '',
//   password: '',
//   registered: false,
//   loggedIn: false,
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add any custom head elements here */}
      </head>
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
