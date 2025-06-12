// src/pages/index.tsx

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>DB Benchmark</title>
      </Head>
      <main>
        <h1>Welcome to DB Benchmark Simulator</h1>
        <p>這是首頁，之後可以放表單來模擬使用者登入。</p>
      </main>
    </>
  );
}