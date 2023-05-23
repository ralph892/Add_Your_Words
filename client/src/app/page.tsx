'use client'
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {BsFillSearchHeartFill} from "react-icons/bs";

import "tailwindcss/tailwind.css";
import { HeadlessTippy } from "@/components/HeadlessTippy";

export default function Home() {

  const [searchWord, setSearchWord] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleOnChange = () => {
    if(inputRef.current){
      const value = inputRef.current.value;
      setSearchWord(value);
    }
  }

  return (
    <div className="container">
        <div className="form_container">
          <div className="header">
            <h3>MY WORDS LIST</h3>
          </div>
          <HeadlessTippy searchWord={searchWord}>
            <div className='search_container'>
              <div className="search_empty"></div>
              <input 
              ref={inputRef}
              autoFocus={true}
              type='text' 
              className="search_input"
              onChange={handleOnChange}
              value={searchWord}
              ></input>
              <button className="search_btn">
                <Link href={`/SearchPage/${searchWord}`}>
                  <BsFillSearchHeartFill className="search_icon"/>
                </Link>
              </button>
            </div>
          </HeadlessTippy>
        </div>
    </div>
  )
}
