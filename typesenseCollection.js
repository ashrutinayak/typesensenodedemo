const typesenseClient = require('./typesense.config');

// Define a schema for a 'products' collection
const productSchema = {
  name: 'products',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'price', type: 'float' },
    { name: 'rating', type: 'int32' },
  ],
};

const collectionCreate = () => {
  // Create the collection
  typesenseClient.collections().create(productSchema).then((data) => {
    console.log('Collection created:', data);

    // Index sample documents
    const documents = [
      { id: '1', title: 'Nike Air Sneakers', description: 'Comfortable and stylish sneakers.', price: 100, rating: 5 },
      { id: '2', title: 'Adidas Running Shoes', description: 'Perfect for running.', price: 80, rating: 4 },
      { id: '3', title: 'Puma Sports Shoes', description: 'Affordable sports shoes.', price: 60, rating: 4 },
    ];

    documents.forEach((doc) => {
      typesenseClient.collections('products').documents().create(doc).then((data) => {
        console.log('Document indexed:', data);
      });
    });
  }); 
}

module.exports = collectionCreate;