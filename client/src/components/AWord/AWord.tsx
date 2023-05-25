'use client'
import React from 'react';
import Link from 'next/link';

import {BsFillBookmarkHeartFill, BsHeartArrow} from 'react-icons/bs';
import {RiHeartAddFill} from 'react-icons/ri';
import {IoMdHeartDislike} from 'react-icons/io';
import { IBody, deleteWord } from '@/api/apiWords';
import authMiddleware from '@/authMiddleware';
import { Button } from '../Button';

type Props = {
    word: IBody,
}


const AWord = ({word}: Props) => {

    const [validate, setValidate] = React.useState(false);

    if(!word){
      return (
        <div>You have not added this word yet</div>
      )
    }


    const handleDelete = () => {
      deleteWord(word);
    }

      const definitions = [];
      for (let i = 0; i < word.meaning.length; i++){
        definitions.push([word.meaning[i], word.vietnamese[i]]);
      }

      React.useEffect(() => {
        const fetchApi = async () => {
            const checkValidate = await authMiddleware();
            if(!checkValidate.error) {
                setValidate(true);
            } else setValidate(false);
        };
        fetchApi();
        
      },[]);


      return (
        <div className='word_container'>
        <div className='word_header'>
          <BsFillBookmarkHeartFill />
          {word.word} 
        </div>
        <div className='word_subtitle'> {word.wordType} </div>
        <div className='word_special'> {word.phonetic}</div>
        {definitions.map((mean, index) => {
          return (
            <div key={index}>
              <div className='word_meaning'>
                <BsHeartArrow className='word_icon' /> 
                {mean[0]}
              </div>
              <div className='word_vietnamese'> {mean[1]} </div>
            </div>
          )
        })}
        {validate && <div className='button_container'>
            <Button icon tertiary> <Link href={`/UpdateWordPage/${word.idWord}`}>Update Word</Link> <RiHeartAddFill/></Button>
            <Button onClick={handleDelete} icon tertiary> <Link href='/ListPage'>Delete Word</Link> <IoMdHeartDislike/> </Button>
        </div>}
      </div>
      )
};

export default AWord;