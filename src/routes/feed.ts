import { Router, Request, Response } from "express";
import Tweet from '../models/tweet';

const router = Router();

router.get('/feed', async (req: Request, res: Response) => {
    const tweets = await Tweet.findAll({
        order: [['createdAt', 'DESC']],
    });

    res.json(tweets);
});

export default router;