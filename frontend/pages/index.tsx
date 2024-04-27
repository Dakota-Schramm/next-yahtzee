import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { GiRollingDiceCup } from "react-icons/gi";

import Title from '~/components/Title';


const Home: NextPage = () => {
  return (
    // Have main screen that lets you navigate to scores, exit and play
    <div className="w-screen h-screen bg-blue-300 flex items-center justify-center">
      <section className='flex flex-col items-center justify-around container bg-blue-500 w-full h-full'>
        <header className='flex flex-col items-center justify-center'>
          <Title />
          <h2 className='mt-16 font-workSans'>Written by Dakota Schramm</h2>
        </header>
        <section className='flex justify-center items-between'>
          <Link href='/game'>
            <button className='flex items-center justify-center p-4 mx-4 text-white bg-blue-500 rounded-md h-11 border-white border'>
              <GiRollingDiceCup /> <span className='ml-4 font-jersey10'>Play</span>
            </button>
          </Link>
        </section>
      </section>
    </div>
  );
}

export default Home
