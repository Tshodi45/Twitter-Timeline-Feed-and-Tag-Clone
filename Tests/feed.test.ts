import request from 'supertest';
import app from '../src/app';
import User from '../src/models/user';
import Tweet from '../src/models/tweet'


describe('Feed API', () => {
    beforeAll(async () => {
        const user = await User.create({ username: 'testuser', password: 'password'});

        await Tweet.bulkCreate([
            {userId: user.id, content: 'User tweet1'},
            {userId: user.id, content: 'User tweet 2'},
        ]);

        const otherUser = await User.create({ username: 'otheruser', password: 'password'});

        await Tweet.create({ userId: otherUser.id, content: ' other user tweet'});
    });
    it('shpuld fetch the public feed with all tweets in order', async () => {
        const response = await request(app).get('/api/feed');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
        expect(response.body[0].content).toBe('Other user tweet');
        expect(response.body[1].content).toBe('User tweet 2');
        expect(response.body[2].content).toBe('User tweet 1');

    })
})