import express from 'express';
import { getAllWords, getSearchWord, handleDeleteWord, postAddWord, getUpdateWord, postUpdateWord, handleGetTooltip } from '../controllers/apiController.js';

const router = express.Router();

const apiRoutes = (app) => {

    router.get('/getAllWords', getAllWords);

    router.get('/getSearchWord/:search_word?', getSearchWord);

    router.post('/postAddWord', postAddWord);

    router.post('/deleteWord', handleDeleteWord);

    router.get('/getUpdateWord/:id', getUpdateWord);

    router.post('/postUpdateWord', postUpdateWord);

    router.get('/getTooltip/:word?', handleGetTooltip);

    return app.use('/admin/api', router);
}

export default apiRoutes;