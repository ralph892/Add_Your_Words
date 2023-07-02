"use client";
import { getWords } from "@/api/apiWords";
import React from "react";
import AWord from "@/components/AWord/AWord";
import { IBody } from "@/api/apiWords";

export default function Page() {
  const [wordsResult, setWordsResult] = React.useState<IBody[]>([]);

  const [validate, setValidate] = React.useState(false);

  React.useEffect(() => {
    const fetchApi = async () => {
      let data = await getWords();
      if (!data) {
        setValidate(false);
        location.assign("/LoginPage");
      } else {
        setWordsResult(data.dataRows);
        setValidate(true);
      }
    };
    fetchApi();
  }, []);

  return (
    validate && (
      <div className="list_container">
        {wordsResult.map((word, index) => {
          return (
            <div key={index} className="words_container">
              <AWord word={word} />
            </div>
          );
        })}
      </div>
    )
  );
}
