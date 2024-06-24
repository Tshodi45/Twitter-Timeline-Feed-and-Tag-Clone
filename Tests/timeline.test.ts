import request from 'supertest';
import app from '../src/app';
import User from '../src/models/user';
import Tweet from '../src/models/tweet';
import Tag from '../src/models/tag';

describe('Timeline API', () => {
  let userId: number;

  beforeAll(async () => {
    const user = await User.create({ username: 'testuser', password: 'password' });
    userId = user.id;

    await Tweet.bulkCreate([
      { userId, content: 'User tweet 1' },
      { userId, content: 'User tweet 2' }
    ]);

    const otherUser = await User.create({ username: 'otheruser', password: 'password' });
    const tweet = await Tweet.create({ userId: otherUser.id, content: 'Other user tweet' });

    await Tag.create({ tweetId: tweet.id, taggedUserId: userId });
  });

  it('should fetch the timeline with user tweets and tagged tweets', async () => {
    const response = await request(app).get(`/api/timeline?userId=${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
    expect(response.body[0].content).toBe('Other user tweet');
    expect(response.body[1].content).toBe('User tweet 2');
    expect(response.body[2].content).toBe('User tweet 1');
  });
});
