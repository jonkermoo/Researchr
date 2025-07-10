import Logo from "../../assets/images/logo.png";

export default function Welcome() {
  return (
    <div className="flex flex-col justify-center items-center gap-[25px] h-full">
      <div className="text-[16px]" style={{ fontFamily: "Hind, sans-serif" }}>
        Researchr does not work on this site
      </div>
      <div>
        <img src={Logo} alt="Researchr Logo" className="w-[75px] h-auto" />
      </div>
      <div className="text-[14px]" style={{ fontFamily: "Hind, sans-serif" }}>
        Try a site on Google Scholars
      </div>
    </div>
  );
}
