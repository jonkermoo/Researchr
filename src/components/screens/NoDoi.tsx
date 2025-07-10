import Logo from "../../assets/images/logo.png";

export default function Welcome() {
  return (
    <div className="flex flex-col justify-center items-center gap-[25px] h-full">
      <div className="text-[16px] font-hind">
        Researchr does not work on this site
      </div>
      <div>
        <img src={Logo} alt="Researchr Logo" className="w-[75px] h-auto" />
      </div>
      <div className="text-[14px] font-hind">Try a site on Google Scholars</div>
    </div>
  );
}
