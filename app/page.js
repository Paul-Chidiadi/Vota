'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
          <button className="btn" onClick={() => router.push('/signup')}>
            Sign Up
          </button>
        </div>
      </section>

      <section className="home-page-hero">
        <div>
          <h1>Making polling easy with VOTA</h1>
          <p>
            Forget the old way, You can have the best process. <br /> Right
            here. Right now!
          </p>
          <Link className="btn links" href="/signup">
            Get Started
          </Link>
        </div>
        <div className="col-2">
          <span className="material-symbols-outlined image">task_alt</span>
        </div>
      </section>

      <section>
        <div className="home-page-body">
          <div>
            <h1>
              This is how <br /> top organizations <br /> make top decisions.
            </h1>
            <p>
              Have access to VOTA's top excellent tools to control your
              workflow, make voting process easy, free and fair. <br />
              Partner with VOTA for end-to-end support.
            </p>
            <Link className="btn-white links" href="/sign">
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
