import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavLink({ href, name }) {
  // console.log(useRouter());
  const router = useRouter();
  return (
    <Link
      className={`nav-link  ${router.pathname === href ? "active" : ""}`}
      href={href}
    >
      {name}
    </Link>
  );
}
