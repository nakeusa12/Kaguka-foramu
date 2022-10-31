import React, { useEffect, useState } from "react";
import Link from "next/link";
import NavLink from "../NavLink";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Button from "../Button";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="header bg-navy">
      <Navbar />
      <Hero />
    </header>
  );
};

const Navbar = () => {
  const router = useRouter();
  const [token, setToken] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    return setToken(Cookies.get("token"));
  });

  const handleLogout = () => {
    console.log("click");
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <nav className='container navbar navbar-expand-lg navbar-dark'>
      <div className='container-fluid'>
        <Link href={'/'} className='navbar-brand'>
            <img src='/images/logo.svg' alt='semina' />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div
            className={`navbar-nav ${
              router.pathname !== '/signin' ? 'mx-auto' : 'ms-auto'
            } my-3 my-lg-0`}
          >
            <NavLink href={'/'} name="Home"/>
            <NavLink href={'/browse'} name="Browse"/>
            <NavLink href={'/stories'} name="Stories"/>
            <NavLink href={'/about'} name="About"/>
          </div>

          {router.pathname !== '/signin' && (
            <>
              {token ? (
                <div className='navbar-nav ms-auto'>
                  <div className='nav-item dropdown d-flex flex-column flex-lg-row align-items-lg-center authenticated gap-3'>
                    <span className='text-light d-none d-lg-block'>
                      Hello, Shayna M
                    </span>

                    <a
                      className='nav-link dropdown-toggle mx-0 d-none d-lg-block'
                      href='#'
                      id='navbarDropdown'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <img src='/images/avatar.png' alt='semina' width='60' />
                    </a>

                    <a
                      className='d-block d-lg-none dropdown-toggle text-light text-decoration-none'
                      data-bs-toggle='collapse'
                      href='#collapseExample'
                      role='button'
                      aria-expanded='false'
                      aria-controls='collapseExample'
                    >
                      <img src='/images/avatar.png' alt='semina' width='60' />
                    </a>

                    <ul
                      className='dropdown-menu'
                      aria-labelledby='navbarDropdown'
                    >
                      <li>
                        <Link href={'/dashboard'} className='dropdown-item'>
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <a className='dropdown-item' href='#'>
                          Settings
                        </a>
                      </li>
                      <li>
                        <a className='dropdown-item' href='#'>
                          Rewards
                        </a>
                      </li>
                      <li onClick={() => handleLogout()}>
                        <a className='dropdown-item'>Sign Out</a>
                      </li>
                    </ul>

                    <div className='collapse' id='collapseExample'>
                      <ul className='list-group'>
                        <li>
                          <a className='list-group-item' href='#'>
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a className='list-group-item' href='#'>
                            Settings
                          </a>
                        </li>
                        <li>
                          <a className='list-group-item' href='#'>
                            Rewards
                          </a>
                        </li>
                        <li onClick={() => handleLogout()}>
                          <a className='list-group-item'></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='d-grid'>
                  <Link href={'/signin'} className='btn-navy'>
                    Sign In
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-headline">
          Expand Your <span className="text-gradient-blue">Knowledge</span>{" "}
          <br className="d-none d-lg-block" />
          by <span className="text-gradient-pink">Joining</span> Our Greatest
          Events
        </div>
        <p className="hero-paragraph">
          Kami menyediakan berbagai acara terbaik untuk membantu{" "}
          <br className="d-none d-lg-block" />
          anda dalam meningkatkan skills di bidang teknologi
        </p>
        <a href="#grow-today" className="btn-green">
          Browse Now
        </a>
      </div>

      <div className="d-flex flex-row flex-nowrap justify-content-center align-items-center gap-5 header-image">
        <img src="/images/1.png" alt="semina" className="img-1" />
        <img src="/images/2.png" alt="semina" className="img-2" />
        <img src="/images/1.png" alt="semina" className="img-1" />
      </div>
    </>
  );
};
