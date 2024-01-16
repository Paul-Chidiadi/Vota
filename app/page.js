"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <section className="home-page-top">
        <Link className="app-name links" href="/">
          VOTA<span className="material-symbols-outlined">task_alt</span>
        </Link>
        <div>
          <Link className="join links" href="/login">
            Log in
          </Link>
          <button className="btn" onClick={() => router.push("/signup")}>
            Sign Up
          </button>
        </div>
      </section>

      <section className="home-page-hero">
        <div>
          <h1>Making polling easy with VOTA</h1>
          <p>
            Revolutionize your polling experience with VOTA – a fresh, intuitive
            approach that discards the old ways and offers you the ultimate
            process. Say goodbye to outdated methods; embrace the future of
            polling right here, right now!
          </p>
          <Link className="btn links" href="/signup">
            Get Started
          </Link>
        </div>
        <div className="col-2">
          <span className="material-symbols-outlined image">task_alt</span>
        </div>
      </section>

      <section className="home-body">
        <div className="home-page-body">
          <div>
            <h1>
              This is how <br /> top organizations <br /> make top decisions.
            </h1>
            <p>
              Vota is your gateway to top-notch tools designed to streamline
              your workflow, simplify the voting process, and ensure fairness.
              Our user-friendly platform ensures the best possible experience,
              making polling a breeze. Welcome to a new era of simplicity and
              efficiency.
            </p>
            <Link className="btn-white links" href="/signup">
              Get Started
            </Link>
          </div>
          <div className="col-2">
            <Image
              className="img"
              src="/images/Get-in-Front.png"
              width={250}
              height={250}
              alt="Get-in-Front"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
