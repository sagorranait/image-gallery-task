import Header from "./components/Header";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";

const App = () => {
  return (
    <div className="app container mx-auto mt-5">
      <Header/>
        <Gallery/>
      <Footer/>
    </div>
  );
}

export default App;