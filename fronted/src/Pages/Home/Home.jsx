import Navbar from "../../components/NavBar";
import Hero from "./Section/Hero";
import RecentBlogs from "./Section/RecentBlog"
import PopularBlog from "./Section/PopularBlog"
import Footer from "../../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <PopularBlog/>
      <RecentBlogs />
      <Footer />
    </>
  );
}

export default Home;
