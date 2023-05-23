import express from 'express';

import { getHomepage, getAdminpage, handleAddWord, handleSearchWord, handleListWord, handleDeleteWord, getUpdateWord, handleUpdateWord, handleGetWord } from '../controllers/webController.js';

const router = express.Router();

export const webRouters = (app) => {
    app.get('/', getHomepage);

    app.get('/addWord', getAdminpage);

    app.get('/listAllWord', handleListWord);

    app.post('/handleAddWord', handleAddWord);

    app.post('/handleSearchWord', handleSearchWord);

    app.get('/handleGetWord/:nameWord?', handleGetWord)

    app.post('/deleteWord/:idWord', handleDeleteWord);

    app.get('/updateWord/:idWord', getUpdateWord);

    app.post('/handleUpdateWord/:idWord/:idDef', handleUpdateWord);

    app.use('/', router);
}