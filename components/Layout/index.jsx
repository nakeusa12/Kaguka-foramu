import Head from "next/head";
import { useEffect, useState } from "react";
import { Footer } from "../Footer";
import { HiArrowNarrowUp } from "react-icons/hi";

export const Layout = ({ children, titlePage, metaDescription }) => {
  const title = titlePage ? `Kaguka Foramu || ${titlePage}` : "Kaguka Foramu";
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {children}
        {showTopButton && (
          <button className="button-to-top" onClick={goToTop}>
            <HiArrowNarrowUp className="arrow-up" />
          </button>
        )}
      </main>

      <Footer />
    </div>
  );
};
