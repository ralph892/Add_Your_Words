'use client'
import { IParams, getUpdateWord, postUpdateWord } from "@/api/apiWords";
import React from "react";
import { IBody } from "@/api/apiWords";
import authMiddleware from "@/authMiddleware";
import { Button } from "@/components/Button";

export interface Props {
    params: IParams
}

export default function Page ({params} : Props) {

    const [idWord, setIdWord] = React.useState('');
    const [idDef, setIdDef] = React.useState<number[]>([]);
    const [word,setWord] = React.useState('');
    const [phonetic, setPhonetic] = React.useState('');
    const [wordType, setWordType] = React.useState(''); 
    const [meaning, setMeaning] = React.useState<string[]>([]); 
    const [vietnamese, setVietnamese] = React.useState<string[]>([]);
    const [numberMeaning, setNumberMeaning] = React.useState<number[]>([]);

    const [validate, setValidate] = React.useState(false);

    React.useEffect(() => {
        const fetchApi = async () => {

            const checkValidate = await authMiddleware('/LoginPage');
            if(!checkValidate.error) {
                setValidate(true);
            } else setValidate(false);
            const response = await getUpdateWord(params);
            setIdWord(response.data[0].idWord);
            setWord(response.data[0].word);
            setPhonetic(response.data[0].phonetic);
            setWordType(response.data[0].wordType);
            for(let i = 0; i< response.data.length; i++) {
                numberMeaning.push(1);
                setMeaning(prev => [...prev,response.data[i].meaning]);
                setVietnamese(prev => [...prev,response.data[i].vietnamese]);
                setIdDef(prev => [...prev, response.data[i].idDef]);
            }
        };
        fetchApi(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    const handleAddMeaning = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setNumberMeaning(prev => [...prev,1]);
    };

    const handleChangeMeaning = (e: React.ChangeEvent<HTMLInputElement>, index:number) => {
        const {value} = e.target;
        setMeaning(prev => {
            const updateMeaning:string[] = [...prev];
            updateMeaning[index]  = value;
            return updateMeaning;
        });
        
    };

    const handleChangeVietnamese  = (e: React.ChangeEvent<HTMLInputElement>, index:number) => {
        const {value} = e.target;
            setVietnamese(prev => {
            const updateVietnamese:string[] = [...prev];
            updateVietnamese[index]  = value;
            return updateVietnamese;
        });
    };

    const handlePostUpdate = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let data:IBody = {idWord,idDef,word,phonetic,wordType,meaning,vietnamese};
        postUpdateWord(data);
        location.reload();
    };

    return ( validate &&
        <div className="form-adding_container">
            <form className="form_adding">
                <div className="form_section">
                    <label className="form-adding_label">Name of Word</label>
                    <input 
                    className="form_input"
                    value={word}
                    onChange = {(e) => setWord(e.target.value)}
                    ></input>
                </div>
                <div className="form_section">
                    <label className="form-adding_label">Add the phonetic of word</label>
                    <input 
                    className="form_input"
                    value={phonetic}
                    onChange={(e) => setPhonetic(e.target.value)}
                    ></input>
                </div>
                <div className="form-radio">
                    <label className="form-adding_label">Type of Word</label>
                    <div className="form-radio_section">
                        <label className="form-adding_label">Noun</label>
                        <input 
                        type="radio" 
                        name='word_type' 
                        value='noun'
                        checked={wordType==='noun'}
                        onChange={(e) => setWordType(e.target.value)}
                        ></input>
                    </div>
                    <div className="form-radio_section">
                        <label className="form-adding_label">Verb</label>
                        <input 
                        type="radio" 
                        name='word_type' 
                        value='verb' 
                        checked={wordType==='verb'}
                        onChange={(e) => setWordType(e.target.value)}
                        ></input>
                    </div>
                    <div className="form-radio_section">
                        <label className="form-adding_label">Adjective</label>
                        <input 
                        type="radio" 
                        name='word_type' 
                        value='adjective' 
                        checked={wordType==='adjective'}
                        onChange={(e) => setWordType(e.target.value)}
                        ></input>
                    </div>
                    <div className="form-radio_section">
                        <label className="form-adding_label">Adverb</label>
                        <input 
                        type="radio" 
                        name='word_type' 
                        value='adverb' 
                        checked={wordType==='adverb'}
                        onChange={(e) => setWordType(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="form_section">
                    {numberMeaning.map((item,index) => {
                        return (
                            <div key={index} className="form-defs_container">
                                <div className="form-defs_section">
                                    <label className="form-adding_label">The Meaning of Word</label>
                                    <input 
                                    value={meaning[index]}
                                    className="form_input" 
                                    onChange = {(e) => handleChangeMeaning(e,index)}
                                    ></input>
                                </div>
                                <div className="form-defs_section">
                                    <label className="form-adding_label">The Vietnamese meaning</label>
                                    <input 
                                    className="form_input" 
                                    value={vietnamese[index]}
                                    onChange = {(e) => handleChangeVietnamese(e,index)}
                                    ></input>
                                </div>
                            </div>
                        )
                    })}
                    <Button onClick={(e) => handleAddMeaning(e)} xsmall primary>Add more meaning</Button>
                </div>
                
                <Button onClick={(e) => handlePostUpdate(e)} large primary> Update word </Button>
            </form>
        </div>
    )    
}