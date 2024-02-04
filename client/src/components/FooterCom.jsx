import logo from "../assets/BlogHive.png";
import { Footer } from "flowbite-react";

export default function FooterCom() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand href="#" src={logo} alt="Logo" />
          <Footer.LinkGroup>
            <Footer.Link href="#">My Portfolio</Footer.Link>
            <Footer.Link href="https://github.com/kartik3110">
              GitHub
            </Footer.Link>
            <Footer.Link href="https://www.linkedin.com/in/kartikgupta3110/">
              LinkedIn
            </Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          href="#"
          by="Kartik Gupta"
          year={new Date().getFullYear()}
        />
      </div>
    </Footer>
  );
}
