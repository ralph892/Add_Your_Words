'use client'
import { getWords } from "@/api/apiWords";
import React from 'react';
import AWord from "@/components/AWord/AWord"; 
import { IBody } from "@/api/apiWords";
import authMiddleware from "@/authMiddleware";


export default function Page () {


    const [wordsResult, setWordsResult] = React.useState<IBody[]>([]);

    const [validate, setValidate] = React.useState(false);

    React.useEffect(() => {
        const fetchApi = async () => {
            let data = await getWords();
            setWordsResult(data.dataRows);
        };
        fetchApi();
    },[]);

    React.useEffect(() => {
        const fetchApi = async () => {
            const checkValidate = await authMiddleware('/LoginPage');
            if(!checkValidate.error) {
                setValidate(true);
            } else setValidate(false);
        }
        fetchApi();
    },[]);
    
    return ( validate &&
        <div  className="list_container">
            {wordsResult.map((word,index) => {
                return (
                    <div key={index}>
                        <AWord word={word} />
                    </div>
                )
            })}
        </div>

    )
};