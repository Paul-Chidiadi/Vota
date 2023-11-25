'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Orgpage from '/components/global/Orgpage.js';
import React, { useState } from 'react';

export default function Page() {
  const router = useRouter();

  return (
    <section className="orgs-single-page">
      <Orgpage userRole="organization" />
    </section>
  );
}
