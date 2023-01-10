import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    // Have main screen that lets you navigate to scores, exit and play
    <section className='flex flex-col items-center justify-around w-screen h-screen bg-blue-300'>
      <header className='flex flex-col items-center justify-center'>
        <h1>Yahtzee!</h1>
        <h2>Written by Dakota Schramm</h2>
      </header>
      <section className='flex justify-center items-between'>
        <Link href='/game'>
          <button
            className='flex items-center justify-center p-4 mx-4 text-white bg-blue-500 rounded-md h-11'
          >
            Play
          </button>
        </Link>
      </section>
    </section>
  )
}

export default Home
