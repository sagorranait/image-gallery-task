import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="app container mx-auto mt-10">
      <Header/>
        <Gallery/>
      <Footer/>
    </div>
  );
}

export default App;