const tf = require('@tensorflow/tfjs-node');
const typesenseClient = require('./typesense.config');

const search = async(req, res) => {
  try {
      const query = req.query.q || '';
      // Perform a search on the 'products' collection
      const searchResults = await typesenseClient.collections('products').documents().search({
        q: query,
        query_by: 'title,description',
      });
  
      res.json(searchResults.hits);
  } catch (error) {
  console.error('Search error:', error);
  res.status(500).json({ error: 'Search failed.' });
  }
}

const searchML = async(req, res) => {
  try {
    const query = req.query.q || '';
    const searchResults = await typesenseClient.collections('products').documents().search({
      q: query,
      query_by: 'title,description',
    });

    // Apply ML-based re-ranking to search results
    const rankedResults = await rankResultsWithML(searchResults.hits);

    res.json(rankedResults);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed.' });
  }
}

const rankResultsWithML = async (results) => {
  // Extract features (price and rating) for each result
  const features = results.map(result => [
    result.document.price,
    result.document.rating,
  ]);

  // Convert the features into tensors
  const inputTensor = tf.tensor(features);

  // Create a simple neural network model for ranking
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [2] }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  // Mock training with dummy data (you'd train on real data)
  const xs = tf.tensor([[100, 5], [80, 4], [60, 4]]);  // Example input features
  const ys = tf.tensor([[0.9], [0.8], [0.7]]);  // Corresponding relevance scores
  await model.fit(xs, ys, { epochs: 10 });

  // Predict relevance scores for the actual search results
  const predictions = model.predict(inputTensor);

  // Add relevance score to each result and sort by it
  const rankedResults = results.map((result, idx) => ({
    ...result,
    relevanceScore: predictions.dataSync()[idx],
  }));

  // Sort results by relevance score
  rankedResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

  return rankedResults;
}
module.exports = { search, searchML}