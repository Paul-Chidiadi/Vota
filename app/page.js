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
          <button className="btn" onClick={() => router.push('/sign')}>
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
          <Link className="btn links" href="/sign">
            Get Started
          </Link>
        </div>
        <div className="col-2">
          <div class="image-container">
            <span className="material-symbols-outlined image">task_alt</span>
          </div>
        </div>
      </section>

      <section>
        <div></div>
      </section>
    </main>
  );
}
