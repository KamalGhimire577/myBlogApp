

const blogPostDetailModel = (sequelize,DataTypes)=>{
   const blogs = sequelize.define("blog_table",
    {
      id :{
        type :DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey :true,
        
      },
      authorId:{
        type:DataTypes.UUID,
      allowNull:false,
      
      },
      blogTitle :{
        type:DataTypes.STRING,
        allowNull:false,
      },
      blogDescription :{
        type:DataTypes.STRING,
        allowNull:false,
      },
      blogCategory :{
        type:DataTypes.STRING ,
        allowNull:false,
      },
      blogImage:{type:DataTypes.STRING,
        allowNull:true
      }
    }
   )
    return blogs
}
module.exports = blogPostDetailModel