const { Sequelize, DataTypes } = require("sequelize");
const userModel = require("./models/userModel");
const blogPostDetailModel = require("./models/blogPostModel");
const comments = require("./models/commentModel");
const blog_author = require("./models/blogAuthorModel");
const categories = require("./models/categoryModel");

const sequelize = new Sequelize(
  "postgresql://postgres.hcmapvzqempjuktyfbot:kamal123kkrtheboos@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(" Database connected successfully");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log(" Database synced successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection error", err);
  });

const users = userModel(sequelize, DataTypes);
const blogs =blogPostDetailModel(sequelize, DataTypes);
const blogbyauthor =blog_author(sequelize,DataTypes)
const category =categories(sequelize,DataTypes)
const cumment =comments(sequelize,DataTypes)

// Define associations (foreign keys)
users.hasMany(blogs, { foreignKey: 'authorId', as: 'userBlogs' });
blogs.belongsTo(users, { foreignKey: 'authorId', as: 'author' });

users.hasMany(blogbyauthor, { foreignKey: 'authorId', as: 'authorBlogs' });
blogbyauthor.belongsTo(users, { foreignKey: 'authorId', as: 'author' });

blogs.hasMany(blogbyauthor, { foreignKey: 'blogid', as: 'blogAuthors' });
blogbyauthor.belongsTo(blogs, { foreignKey: 'blogid', as: 'blog' });

blogs.hasMany(cumment, { foreignKey: 'blogId', as: 'blogComments' });
cumment.belongsTo(blogs, { foreignKey: 'blogId', as: 'blog' });

users.hasMany(cumment, { foreignKey: 'authorId', as: 'userComments' });
cumment.belongsTo(users, { foreignKey: 'authorId', as: 'author' });

blogs.hasMany(category, { foreignKey: 'authorId', as: 'blogCategories' });
category.belongsTo(blogs, { foreignKey: 'authorId', as: 'blog' });

users.hasMany(category, { foreignKey: 'authorId', as: 'userCategories' });
category.belongsTo(users, { foreignKey: 'authorId', as: 'author' });

module.exports = { sequelize, Sequelize, users,blogs,blogbyauthor,category,cumment };
