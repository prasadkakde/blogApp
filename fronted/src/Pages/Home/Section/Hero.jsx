import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login"); 
  };

   const clicksignup = () => {
    navigate("/signup");
   };


  return (
    <section className="w-full bg-blue-100 text-center py-20">
      <h1 className="text-4xl font-bold mb-4 text-black">
        Your Engineering Knowledge Hub
      </h1>
      <p className="text-black-200 mb-8 max-w-xl mx-auto">
        A blog for engineering students and professionals who want to think
        beyond textbooks.
      </p>

      <div className="flex justify-center gap-6">
        <Button text="Register Now" variant="primary" onClick={clicksignup} />
        <Button text="Read Blog" variant="secondary" onClick={goToLogin} />
      </div>
    </section>
  );
}

export default Hero;
