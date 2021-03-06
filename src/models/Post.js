const { model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    comments: [
      {
        body: String,
        username: String,
        createdAt: String,
      },
    ],
    likes: [
      {
        username: String,
        createdAt: String,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
