import Logo from "../../assets/images/logo.png";
import "../../style/fonts.css";

export default function Welcome() {
  return (
    <div className="flex flex-col justify-center items-center gap-[25px] h-full">
      <div className="text-[16px] font-bold font-hind">
        Welcome to Researchr!
      </div>
      <div>
        <img src={Logo} alt="Researchr Logo" className="w-[75px] h-auto" />
      </div>
      <div className="text-[14px] font-hind">
        Start researching to get started!
      </div>
    </div>
  );
}
