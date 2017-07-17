const Article = require('../models/staff').Article;

Article
  .sync({force: true})
  .then(() => {
    Article.create({
      title: 'Hello there',
      slug: 'hello-there',
      body: 'A nothing article about saying hello in different languages',
      approved: true
    }, {
      fields: ['title', 'body', 'slug']
    }).then(instertedArticle => {
      console.log(instertedArticle.dataValues);
    });
  })
  .catch(error => {
    console.log(error);
  });

