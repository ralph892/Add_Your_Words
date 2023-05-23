'use client'
import React from "react";

import { searchWord, IParams, IBody } from "@/api/apiWords";
import { AWord } from "@/components/AWord";

interface Props {
    params: IParams
}

export default function Page ({ params} : Props) {

    const [wordResult, setWordResult] = React.useState<IBody[]>();
    
    React.useEffect(() => {
        const fetchApi = async () => {
            const data = await searchWord(params);
            setWordResult(data.dataRows);
            
        };
        fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); // it is just a warning, do not need to fix until necessary

    return (
        <div className="list_container">
            {wordResult && <AWord word={wordResult[0]}/>}
        </div>
    )
};