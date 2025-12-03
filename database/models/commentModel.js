const comments = (sequelize, DataTypes) => {
  const commentTable = sequelize.define("comment_Table", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    blogId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    commenterId:{
      type:DataTypes.STRING,
      allowNull:false
    },
    commenter_Name:
    {
        type:DataTypes.STRING,
        allowNull:false,
    },
    commentor_message:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    commentor_Email:{
        type:DataTypes.STRING,
        allowNull:false,
    }
  });
  return commentTable;
};
module.exports = comments;
