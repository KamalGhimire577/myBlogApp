const { Sequelize, DataTypes } = require("sequelize");
const userModel = require("./models/userModel");
const blogPostDetailModel = require("./models/blogPostModel");
const comment = require("./models/commentModel");
const blog_author = require("./models/blogAuthorModel");

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
    console.log("✅ Database connected successfully");
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    console.log("✅ Database synced successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection error", err);
  });

const users = userModel(sequelize, DataTypes);
const blogs =blogPostDetailModel(sequelize, DataTypes);
const blogbyauthor =blog_author(sequelize,DataTypes)
module.exports = { sequelize, Sequelize, users,blogs,blogbyauthor };
