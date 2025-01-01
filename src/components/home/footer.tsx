import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full mt-28 flex items-center justify-center">
      {/* <div className="max-w-5xl w-full px-3"></div> */}

      <div className="max-w-5xl w-full flex items-center justify-center pt-6 px-3">
        <div className="opacity-80">
          © Pluto 2024 , Made with ♥︎{" "}
          <Link target="_blank" href={"https://github.com/Ashpara10/"}>
            Ashwin
          </Link>{" "}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
