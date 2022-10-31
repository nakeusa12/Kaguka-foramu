import Link from "next/link";
import { useRouter } from "next/router";


export default function About() {
  const router = useRouter();

  return (
    <div>

      <main>
        {/* <Header /> */}
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <Link href="/" className={`nav-link  ${router.pathname === "/" ? "active" : ""}`}>Home</Link>
        <Link href="/about" className={`nav-link  ${router.pathname === "/about" ? "active" : ""}`}>About</Link>
      </main>
    </div>
  );
}
