/* eslint-disable @next/next/no-img-element */
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NavLink from "../NavLink";

export const Navbar = ({ response }) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [name, setName] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setToken(Cookies.get("token"));
    setName(Cookies.get("name"));
  });

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("name");
    router.push("/");
  };

  return (
    <nav className="container navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link href={"/"} className="navbar-brand">
          <img src="/images/logo.svg" alt="semina" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div
            className={`navbar-nav ${
              router.pathname !== "/signin" ? "mx-auto" : "ms-auto"
            } my-3 my-lg-0`}
          >
            <NavLink href={"/"} name="Home" />
            <NavLink href={"/browse"} name="Browse" />
            <NavLink href={"/stories"} name="Stories" />
            <NavLink href={"/about"} name="About" />
          </div>

          {router.pathname !== "/signin" && (
            <>
              {token ? (
                <div className="navbar-nav ms-auto">
                  <div className="nav-item dropdown d-flex flex-column flex-lg-row align-items-lg-center authenticated gap-1">
                    <span
                      className="text-light d-none d-lg-block"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Hello, {name}
                    </span>

                    <a
                      className="d-lg-none dropdown-toggle text-decoration-none bg-transparent border-0"
                      data-bs-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <img src="/images/avatar.png" alt="kaguka" width="30" />
                    </a>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link href={"/dashboard"} className="dropdown-item">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Settings
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Rewards
                        </a>
                      </li>
                      <li onClick={() => handleLogout()}>
                        <a className="dropdown-item">Sign Out</a>
                      </li>
                    </ul>

                    <div className="collapse" id="collapseExample">
                      <ul className="list-group">
                        <li>
                          <a className="list-group-item" href="#">
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a className="list-group-item" href="#">
                            Settings
                          </a>
                        </li>
                        <li>
                          <a className="list-group-item" href="#">
                            Rewards
                          </a>
                        </li>
                        <li onClick={() => handleLogout()}>
                          <a className="list-group-item"></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="d-grid">
                  <Link href={"/signin"} className="btn-navy">
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
