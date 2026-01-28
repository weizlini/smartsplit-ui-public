import { Header } from "./Header";
import Footer from "./Footer";

const PageTemplate = (props) => {
  return (
    <div>
      <Header />
      <div className="page-content">{props.children}</div>
      <Footer />
    </div>
  );
};
export default PageTemplate;
