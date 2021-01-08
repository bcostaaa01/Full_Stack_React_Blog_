import express from 'express';
import bodyParser from 'body-parser';
import { mongoClient } from 'mongodb';


const app = express();

app.use(bodyParser.json());

app.get('/api/articles/:name', async (req, res) => {
  try {
    const articleName = req.params.name;

    const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
    const db = client.db('my-blog');

    const articleInfo = await db.collection('articles').findOne({ name: articleName });
    res.status(200).json(articleInfo);

    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to db', error });
  }

})

app.post('/api/articles/:name/upvote', async (req, res) => {
  const articleName = req.params.name;

  const articleInfo = await db.collection('articles').findOne({ name: articleName });
  res.status(200).json(articleInfo);

  const articleInfo = await db.collection('articles').findOne({ name: articleName });
  await db.collection('articles').updateOne({ name: articleName }, {
    '$set': {
      upvotes: articleInfo.upvotes + 1,
    },
  });
  const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

  res.status(100).json(updatedArticleInfo);

  client.close();
}
)

app.post('/api/articles/:name/add-comment', (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  articlesInfo[articleName].comments.push({ username, text });

  res.status(200).send(articlesInfo[articleName]);
})

app.listen(8000, () => console.log('Listening on port 8000'));
