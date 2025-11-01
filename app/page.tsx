import Image from "next/image";
import Nav from "./components/Nav";
import HeroSection from "./components/Home";
import Sponsors from "./components/Sponsors";
import Footer from "./components/Footer";
import News from "./components/News";
import NextGame from "./components/NextGame";
import Suscribe from "./components/Suscribe";
import Camisetas from "./components/Camisetas";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center md:gap-36 ">

<section className="w-full h-[99vh] flex items-center justify-center">
    <News />

</section>
<section className="w-full h-[99vh] flex items-center justify-center">
   <NextGame />
</section>
<section className="w-full h-full flex items-center justify-center">
  <Camisetas />
  </section>
<section className="w-full h-full flex items-center justify-center">
    <Sponsors />
</section>
<section className="w-full h-full flex items-center justify-center">
   <Suscribe />
</section>
<section className="w-full h-full flex items-center justify-center">
    <Footer />
</section>
    </div>
   
  );
}
