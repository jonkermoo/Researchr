import researchr from "../assets/images/researchr.png";

export default function Header() {
  const onClick = () => {
    window.open(
      "https://github.com/jonkermoo",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <img
        src={researchr}
        alt={"Logo"}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick();
        }}
        className="w-[136px] h-auto cursor-pointer pt-[9px] pl-[12]"
      />
    </>
  );
}
