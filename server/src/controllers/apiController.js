import connectDB from "../config/connectDB.js";

export const getAllWords = async (req, res) => {
    const [rows, fields] = await connectDB.execute('SELECT words.id as idWord,word,phonetic,wordType,meaning,vietnamese from `Words`,`Definitions` WHERE Words.id = definitions.idWord ');
    let dataRows = rows;
    if (dataRows.length === 1) {
        dataRows[0].meaning = [dataRows[0].meaning];
        dataRows[0].vietnamese = [dataRows[0].vietnamese];
    }
    for (let i = 0; i < dataRows.length - 1; i++) {
        for (let j = i + 1; j < dataRows.length; j++) {
            if (dataRows[i].idWord === dataRows[j].idWord) {
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
        if (typeof (dataRows[i].meaning) === 'string') {
            dataRows[i].meaning = [dataRows[i].meaning];
            dataRows[i].vietnamese = [dataRows[i].vietnamese];
        }
    };
    return res.status(200).json({
        dataRows
    })
};

export const getSearchWord = async (req, res) => {
    const search_word = req.params.search_word;
    const [rows, fields] = await connectDB.execute('SELECT words.id as idWord, word,phonetic,wordType,meaning,vietnamese from `Words`,`Definitions` WHERE Words.id = definitions.idWord AND word = UPPER(?)', [search_word]);
    let dataRows = rows;
    if (dataRows.length === 1) {
        dataRows[0].meaning = [dataRows[0].meaning];
        dataRows[0].vietnamese = [dataRows[0].vietnamese];
    }
    for (let i = 0; i < dataRows.length - 1; i++) {
        for (let j = i + 1; j < dataRows.length; j++) {
            if (dataRows[i].idWord === dataRows[j].idWord) {
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

        if (typeof (dataRows[i].meaning) === 'string') {
            dataRows[i].meaning = [dataRows[i].meaning];

            dataRows[i].vietnamese = [dataRows[i].vietnamese];
        }
    };

    return res.status(200).json({
        dataRows
    })
};

export const postAddWord = async (req, res) => {
    const { word, phonetic, wordType, meaning, vietnamese } = req.body.data;
    const idWord = `${word + Date.now()}}`;
    await connectDB.execute('INSERT INTO `Words`(id,word, phonetic, wordType) VALUES (?,?,?,?)', [idWord, word, phonetic, wordType ?? 'unknown']);
    if (Array.isArray(meaning))
        for (let i = 0; i < meaning.length; i++) {
            await connectDB.execute('INSERT INTO `Definitions`(idWord,meaning,vietnamese) VALUES (?,?,?)', [idWord, meaning[i], vietnamese[i]]);
        }
    else await connectDB.execute('INSERT INTO `Definitions`(idWord,meaning,vietnamese) VALUES (?,?,?)', [idWord, meaning, vietnamese]);
};

export const handleDeleteWord = async (req, res) => {
    const idWord = req.body.data.idWord;
    await connectDB.execute('DELETE words,definitions FROM words JOIN definitions ON words.id=definitions.idWord WHERE words.id = ?', [idWord]);
};

export const getUpdateWord = async (req, res) => {
    const idWord = req.params.id;
    const [rows, fields] = await connectDB.execute('SELECT words.id as idWord, definitions.id as idDef,word,phonetic,wordType,meaning,vietnamese from `Words`,`Definitions` WHERE Words.id = Definitions.idWord AND words.id = ?', [idWord]);
    return res.status(200).json({
        data: rows
    });
};

export const postUpdateWord = async (req, res) => {
    const { idWord, idDef, word, phonetic, wordType, meaning, vietnamese } = req.body.data;

    const [rows, fields] = await connectDB.execute('SELECT count(id) as countId FROM definitions WHERE idWord = ? ', [idWord]);
    await connectDB.execute(' UPDATE `Words` SET word = ?, phonetic = ?, wordType = ? WHERE id = ?', [word, phonetic, wordType, idWord]);
    if (Array.isArray(meaning) && meaning.length > rows[0].countId) {
        for (let i = rows[0].countId; i < meaning.length; i++) {
            await connectDB.execute(' INSERT INTO `Definitions`(idWord, meaning, vietnamese) VALUES (?,?,?)', [idWord, meaning[i], vietnamese[i]]);
        }
    }
    for (let i = 0; i < idDef.length; i++) {
        await connectDB.execute(' UPDATE `Definitions` SET meaning = ?, vietnamese = ? WHERE id = ?', [meaning[i], vietnamese[i], idDef[i]]);
    }
};

export const handleGetTooltip = async (req, res) => {
    const letter = req.params.word;
    const [rows, fields] = await connectDB.execute('SELECT word FROM words WHERE word LIKE ?', [`${letter}%`]);
    return res.status(200).json({
        data: rows
    });

}