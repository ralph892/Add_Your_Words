import connectDB from "../config/connectDB.js";



export const getHomepage = async (req, res) => {
    res.render('Homepage.ejs');
};



export const getAdminpage = async (req, res) => {
    return res.render('addWord.ejs')
}

export const handleListWord = async (req, res) => {
    const [rows, fields] = await connectDB.execute('SELECT words.id,word,phonetic,wordType,meaning,vietnamese from `Words`,`Definitions` WHERE Words.id = definitions.idWord ');
    let dataRows = rows;
    for (let i = 0; i < dataRows.length - 1; i++) {
        for (let j = i + 1; j < dataRows.length; j++) {
            if (dataRows[i].id === dataRows[j].id) {
                if (typeof (dataRows[i].meaning) === 'string') {
                    dataRows[i].meaning = [
                        dataRows[i].meaning,
                        dataRows[j].meaning
                    ]
                }
                else {
                    dataRows[i].meaning = [
                        ...(dataRows[i].meaning),
                        dataRows[j].meaning
                    ];
                };

                if (typeof (dataRows[i].vietnamese) === 'string') {
                    dataRows[i].vietnamese = [
                        dataRows[i].vietnamese,
                        dataRows[j].vietnamese
                    ]
                }
                else {
                    dataRows[i].meaning = [
                        ...(dataRows[i].vietnamese),
                        dataRows[j].vietnamese
                    ];
                }
                dataRows.splice(dataRows.indexOf(dataRows[j]), 1);
            }
        }
    };
    return res.render('listWord.ejs', {
        data: dataRows
    })
}

export const handleAddWord = async (req, res) => {
    const { word, phonetic, wordType, definitions, vietnamese } = req.body;
    const idWord = `${word + Date.now()}}`;
    await connectDB.execute('INSERT INTO `Words`(id,word, phonetic, wordType) VALUES (?,?,?,?)', [idWord, word, phonetic, wordType ?? 'unknown']);
    let i;
    if (Array.isArray(definitions))
        for (i = 0; i < definitions.length; i++) {
            await connectDB.execute('INSERT INTO `Definitions`(idWord,meaning,vietnamese) VALUES (?,?,?)', [idWord, definitions[i], vietnamese[i]]);
        }
    else await connectDB.execute('INSERT INTO `Definitions`(idWord,meaning,vietnamese) VALUES (?,?,?)', [idWord, definitions, vietnamese]);
    return res.redirect('/addWord');
}


export const handleSearchWord = async (req, res) => {
    const search_word = req.body.search_word;
    const [rows, fields] = await connectDB.execute('SELECT words.id,word,phonetic,wordType,meaning,vietnamese from `Words`,`Definitions` WHERE Words.id = definitions.idWord and word = ?', [search_word]);
    let dataRows = rows;
    for (let i = 0; i < dataRows.length - 1; i++) {
        for (let j = i + 1; j < dataRows.length; j++) {
            if (dataRows[i].id === dataRows[j].id) {
                dataRows[i].meaning = [
                    ...dataRows[i].meaning,
                    dataRows[j].meaning
                ];
                dataRows[i].vietnamese = [
                    ...dataRows[i].vietnamese,
                    dataRows[j].vietnamese
                ];
                dataRows.splice(dataRows.indexOf(dataRows[j]), 1);
            }
        }
    };
    return res.render('searchWord.ejs', {
        data: dataRows
    })
}

export const handleDeleteWord = async (req, res) => {
    const idWord = req.params.idWord;
    await connectDB.execute('DELETE words,definitions FROM words JOIN definitions ON words.id=definitions.idWord WHERE words.id = ?', [idWord]);
    return res.redirect('/listAllWord');
}

export const getUpdateWord = async (req, res) => {
    const idWord = req.params.idWord;
    const [rows, fields] = await connectDB.execute('SELECT words.id as idWord, definitions.id as idDef,word,phonetic,wordType,meaning,vietnamese from `Words`,`Definitions` WHERE Words.id = Definitions.idWord AND words.id = ?', [idWord]);
    return res.render('updateWord.ejs', {
        data: rows,
    })
};

export const handleUpdateWord = async (req, res) => {
    const idWord = req.params.idWord;
    const idDef = req.params.idDef.split(',');
    const { word, phonetic, wordType, definitions, vietnamese } = req.body;
    const [rows, fields] = await connectDB.execute('SELECT count(id) as countId FROM definitions WHERE idWord = ? ', [idWord]);
    await connectDB.execute(' UPDATE `Words` SET word = ?, phonetic = ?, wordType = ? WHERE id = ?', [word, phonetic, wordType, idWord]);
    if (Array.isArray(definitions) && definitions.length > rows[0].countId) {
        for (let i = rows[0].countId; i < definitions.length; i++) {
            await connectDB.execute(' INSERT INTO `Definitions`(idWord, meaning, vietnamese) VALUES (?,?,?)', [idWord, definitions[i], vietnamese[i]]);
        }
    }
    for (let i = 0; i < idDef.length; i++) {
        await connectDB.execute(' UPDATE `Definitions` SET meaning = ?, vietnamese = ? WHERE id = ?', [definitions[i], vietnamese[i], idDef[i]]);
    }
    return res.redirect('/');
}

export const handleGetWord = async (req, res) => {
    // const letter = req.params.nameWord;
    // const [rows, fields] = await connectDB.execute('SELECT word FROM words WHERE word LIKE ?', [`${letter}%`]);
    // console.log(searchBar);

}