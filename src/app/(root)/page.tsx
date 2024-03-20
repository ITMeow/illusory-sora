import Head from 'next/head'
import { UserButton, currentUser } from '@clerk/nextjs'
import Link from 'next/link';

const Home = async () => {
  const user = await currentUser();
  return (
    <div className="from-blue-500 flex min-h-screen items-center justify-center bg-gradient-to-br to-purple-500">
      <Head>
        <title>Hello Pages Router with Next.js & Clerk</title>
        <meta name="description" content="A simple Hello World homepage using Next.js and TailwindCSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-blue-500 mb-4 text-2xl font-bold">Hello, Pages Router!</h1>
        <p className="text-gray-600">This is a simple homepage built with Next.js and Clerk</p>
        {user ? (
          <>
            <p>Hello, User: {user.emailAddresses[0]?.emailAddress}</p>
          </>
        ) : (
          <Link href="/sign-in" className="text-blue-500">
            Sign in
          </Link>
        )}
      </div>
      
    </div>
  )
}

export default Home