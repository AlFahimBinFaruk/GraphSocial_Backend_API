const Post = require("../../../models/Post");
const User = require("../../../models/User");
module.exports = {
  Query: {
    async getPosts(_, { pageNo }) {
      try {
        let limit = 10;
        let skip = (parseInt(pageNo) - 1) * limit;
        let posts = await Post.find()
          .populate("user")
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(skip);
       
        //total post count
        const totalPostCount = Math.ceil((await Post.count()) / limit);
        return { posts, totalPostCount };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
