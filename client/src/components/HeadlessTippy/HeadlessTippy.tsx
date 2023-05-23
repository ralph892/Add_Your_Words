import React from 'react';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/themes/light.css';
import Link from 'next/link';
import { IParams, getTooltip } from '@/api/apiWords';

type Props = {
    children: React.ReactElement,
    searchWord?: string,
}

const HeadlessTippy = ({children,searchWord}: Props) => {

    const [result, setResult] = React.useState<IParams[]>([]);

    React.useEffect(() => {
        const fetchApi = async () => {
            if(searchWord){
                const response = await getTooltip(searchWord);
                setResult(response.data);
            }
            else{
                setResult([]);
            }
        };
        fetchApi();
    },[searchWord]);

  return (
          <Tippy
            theme='light'
            placement='bottom'
            hideOnClick={true}
            trigger='click'
            interactive={true}
            render={attrs => (
                <div className="box" tabIndex={-1} {...attrs}>
                    {result.length > 0 && result.map((item,index) => {
                        return (
                            <div key={index} className='tooltip_container'>
                                <button className='tooltip_btn'><Link href={`/SearchPage/${item.word}`}>{item.word}</Link></button>
                            </div>
                        )
                    })}
                </div>
    )}
  >
    {children}
  </Tippy>
  )
};

export default HeadlessTippy;