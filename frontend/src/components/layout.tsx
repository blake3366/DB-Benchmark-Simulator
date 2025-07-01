import styles from '../styles/layout.module.css';
import { Grid, Typography } from '@mui/material';
import Form from './form';

export const siteTitle = 'Next.js Sample Website';

import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode; home: boolean }) {
  return (
    // <div className={styles.container}>
    //   <Head>
    //     <link rel="icon" href="/favicon.ico" />
    //     <meta
    //       name="description"
    //       content="Learn how to build a personal website using Next.js"
    //     />
    //     <meta
    //       property="og:image"
    //       content={`https://og-image.vercel.app/${encodeURI(
    //         siteTitle,
    //       )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
    //     />
    //     <meta name="og:title" content={siteTitle} />
    //     <meta name="twitter:card" content="summary_large_image" />
    //   </Head>
    //   {/* Header */}
    //   <header className={styles.header}>
    //     {home ? (
    //       <>
    //         <Image
    //           priority
    //           src="/images/github_profile.jpg"
    //           className={utilStyles.borderCircle}
    //           height={144}
    //           width={144}
    //           alt=""
    //         />
    //         <h1 className={utilStyles.heading2Xl}>{name}</h1>
    //       </>
    //     ) : (
    //       <>
    //         <Link href="/">
    //           <Image
    //             priority
    //             src="/images/github_profile.jpg"
    //             className={utilStyles.borderCircle}
    //             height={108}
    //             width={108}
    //             alt=""
    //           />
    //         </Link>
    //         <h2 className={utilStyles.headingLg}>
    //           <Link href="/" className={utilStyles.colorInherit}>
    //             {name}
    //           </Link>
    //         </h2>
    //       </>
    //     )}
    //   </header>
    //   <main>{children}</main>
    //   {!home && (
    //     <div className={styles.backToHome}>
    //       <Link href="/">
    //         ← Back to home
    //       </Link>
    //     </div>
    //   )}
    // </div>
    <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}  sx={{ px: 4, py: 3 }}>
      <Grid size={12} className={styles.header}>
        <Typography variant="h5"
        style={{
          fontWeight: 900,
          background: 'linear-gradient(90deg, #1e88e5,rgb(150, 208, 255))', // 漸變顏色
          WebkitBackgroundClip: 'text', // 只應用到文字
          WebkitTextFillColor: 'transparent', // 讓文字顏色透明以顯示漸變
        }}
        >
        Simulate Login 
        </Typography>
        <Form/>
      </Grid>
      <Grid size={12}>
    {/* <Divider sx={{borderColor: '#eee' }} /> */}
    </Grid>
      <Grid size={12} sx={{alignItems: 'center', justifyContent: 'center'}}>
        {children}
      </Grid>
    </Grid>
  );
}