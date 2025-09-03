const blog_author = (sequelize,DataTypes)=>{
    const blog_authorTable = sequelize.define("blog_author",{
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true,
        },
        blogid:{
            type:DataTypes.UUID,
            allowNull:false,
        },
        authorId:{
            type:DataTypes.UUID,
            allowNull:false,

        }
    })
    return blog_authorTable
}
module.exports =blog_author;