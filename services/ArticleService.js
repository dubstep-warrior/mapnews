const Article = require("../models/Article");
var fs = require('fs');
var path = require('path'); 

module.exports = class ArticleService{ 
    static async getAllArticles(){
        try {
            const allArticles = await Article.find().lean();
            return allArticles.map(article => {
                return {...article, coordinates: article.location.coordinates}
            });
        } catch (error) {
            console.log(`Could not fetch articles ${error}`)
        }
    }

    static async createArticle(data){
        try {

            console.log(JSON.parse(data.images))
            // const images = [...data.images].map((img) => {
            //     return {
            //         data: fs.readFileSync(path.join(__dirname + '/uploads/' + img.file.name)),
            //         contentType: 'image/png'
            //     }
            // })

            // const newArticle = {
            //     title: data.title,
            //     tags: data.tags,
            //     category: data.category,
            //     description: data.description,
            //     location: data.location,
            //     images: images
            // }
           const response = await new Article(newArticle).save();
           return response;
        } catch (error) {
            console.log(error);
        } 

    }
    static async getArticlebyId(articleId){
        try {
            const singleArticleResponse =  await Article.findById({_id: articleId});
            return singleArticleResponse;
        } catch (error) {
            console.log(`Article not found. ${error}`)
        }
    }

    // static async updateArticle(title, body, articleImage){
    //         try {
    //             const updateResponse =  await Article.updateOne(
    //                 {title, body, articleImage}, 
    //                 {$set: {date: new Date.now()}});

    //                 return updateResponse;
    //         } catch (error) {
    //             console.log(`Could not update Article ${error}` );

    //     }
    // }

    // static async deleteArticle(articleId){
    //     try {
    //         const deletedResponse = await Article.findOneAndDelete(articleId);
    //         return deletedResponse;
    //     } catch (error) {
    //         console.log(`Could  ot delete article ${error}`);
    //     }

    // }
}