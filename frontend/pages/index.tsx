import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    // Have main screen that lets you navigate to scores, exit and play
    <section className='w-screen h-screen'>
      <h1>Yahtzee!</h1>
      <h2>Written by Dakota Schramm</h2>

    </section>
  )
}

export default Home
