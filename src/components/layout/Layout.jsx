import Header from "../header/Header";

function Layout({ children }) {
  // ✅ FIXED
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
