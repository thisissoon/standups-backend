const Sequelize = require('sequelize');
const connection = require('../db/config').connection;

const Article = connection.define('article', {
  slug: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: {
        args: [10, 100],
        msg: 'Please enter a title between 10 and 100'
      }
    }
  },
  body: {
    type: Sequelize.TEXT,
    defaultValue: 'Coming soon...',
    validate: {
      startsWithUpper: bodyval => {
        const first = bodyval.charAt(0);
        var startsWithUpper = first === first.toUpperCase();
        if (!startsWithUpper) {
          throw new Error('First letter must be a uppercase letter');
        } else {
          // ..
        }
      }
    }
  },
  approved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false,
  hooks: {
    beforeValidate: () => {
      console.log('beforeValidate');
    },
    afterValidate: () => {  
      console.log('afterValidate');
    },
    beforeCreate: () => {
      console.log('beforeCreate');
    },
    afterCreate: (res) => {
      console.log('created article with title:', res.dataValues.title);
    }
  }
});

exports.Article = Article;