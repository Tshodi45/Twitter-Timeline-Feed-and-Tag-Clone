//create the route for fetching the timeline and feed

import { Router, Request, Response } from 'express';
import Tweet from '../models/tweet';
import Tag from '../models/tag';

const router = Router();

router.get('/timeline', async (req: Request, res: Response) => {
    const userId = parseInt(req.query.userId as string, 10); //user request or response and fetching timeline & feed

    const tweets = await Tweet.findAll({
        where: { userId},
        include: [{
            model: Tag,
            where: { taggedUserId: userId},
            required: false,
        }],
        order: [['createdAt', 'DESC']],
    });

    res.json(tweets);
});

export default router;