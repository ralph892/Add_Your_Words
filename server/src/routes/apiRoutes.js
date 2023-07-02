import express from 'express';
import { getAllWords, getSearchWord, handleDeleteWord, postAddWord, getUpdateWord, postUpdateWord, handleGetTooltip } from '../controllers/apiController.js';
import authUsers from '../middlewares/authMiddleware.js';

const router = express.Router();

const apiRoutes = (app) => {

    router.get('/getAllWords', authUsers, getAllWords);

    router.get('/getSearchWord/:search_word?', getSearchWord);

    router.post('/postAddWord', authUsers, postAddWord);

    router.post('/deleteWord', authUsers, handleDeleteWord);

    router.get('/getUpdateWord/:id', authUsers, getUpdateWord);

    router.post('/postUpdateWord', authUsers, postUpdateWord);

    router.get('/getTooltip/:word?', handleGetTooltip);

    return app.use('/admin/api', router);
}

export default apiRoutes;