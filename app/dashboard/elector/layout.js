import Navbar from '/components/navigation/Navbar.js';

export default function Layout({ children }) {
  return (
    <>
      <Navbar userRole="elector" />
      <div className="">{children}</div>
    </>
  );
}
