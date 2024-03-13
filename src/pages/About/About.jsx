import React from "react";

function AboutPage() {
  return (
    <div
      className="flex flex-col justify-center h-auto pt-[20px] md:pt-[120px] pb-[20px] md:pb-[65px] w-[100%] bg-cover bg-center md:justify-center items-center"
      style={{ backgroundImage: "url('/assets/Group 88.jpg')" }}
    >
      <div className=" flex flex-col w-[82%] mx-auto items-center">
        <h3 className="w-[350px] text-[18px] md:w-[700px] md:text-[30px] text-white text-center font-montserrat font-extrabold leading-normal tracking-wider">
          ABOUT US:
        </h3>
        <p className="text-white text-[14px] md:text-[24px] my-[20px] md:mt-[50px] md:mb-[104px]">
          Welcome to Tee’s Bridal, where dreams become dresses and love is woven
          into every stitch. At Tee’s Bridal, we understand that planning the
          perfect wedding is an intricate dance of dreams, details and of
          course, the dress. As your one stop bridal store, we are dedicated to
          making every step of your bridal journey seamless, delightful and
          utterly unforgettable.
        </p>
        <h3 className="w-[350px] text-[18px] md:w-[700px] md:text-[30px] text-white text-center font-montserrat font-extrabold leading-normal tracking-wider">
          OUR STORY:
        </h3>
        <p className="text-white text-[14px] md:text-[24px] md:mt-[50px] my-[20px] md:mb-[104px]">
          Established in the year 2019, Tee’s Bridal emerged from a passion of
          creating unique pieces in all its splendor. Our founder, Toluwase
          Ajayi, envisioned a bridal destination where brides could find
          everything they needed under one roof, simplifying the often
          overwhelming process of wedding planning, providing brides with a
          curated selection of gowns, accessories, shoes and everything in
          between. So why go from store to store when Tee’s Bridal offers
          everything you need in one place ?from exquisite wedding dresses that
          embody timeless beauty to a diverse range of accessories that adds the
          perfect finishing touch , we are not just a store, we are your partner
          in creating a cohesive and stunning bridal look.{" "}
        </p>

        <p className="mt-[15px] text-white text-[14px] md:text-[24px]">
          {" "}
          Tee’s Bridal takes pride in offering diverse array of styles to suit
          every bride’s taste and personality. Whether you’re envisioning a
          classic ball gown, a sleek contemporary silhouette, a classic mermaid
          dress etc, our carefully curated selection ensures that you will find
          the perfect dress that aligns with your unique vision
        </p>

        <p className="mt-[15px] text-white text-[14px] md:text-[24px]">
          {" "}
          Step into our enchanting boutique, where a team of dedicated and
          knowledgeable bridal consultants awaits to guide you through the
          journey of finding your dream dress. Our spacious and elegant showroom
          provides a comfortable and intimate setting for you and your loved
          ones to explore our exquisite collection. From the moment you walk in,
          we strive to create a warm and welcoming atmosphere, making your
          bridal shopping experience a joyous celebration in itself.
        </p>

        <p className="mt-[15px] text-white  text-[14px] md:text-[24px]">
          Thank you for considering Tee’s Bridal as your one stop bridal
          destination. We look forward to being a part of your wedding story and
          turning your dreams to reality.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
