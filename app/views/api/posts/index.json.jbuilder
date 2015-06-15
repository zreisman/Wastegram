json.array!(@posts) do |post|
  json.id post.id
  json.body post.body
  json.image_url post.image_url
  json.author_id post.author_id
  json.author do
    json.id post.user.id
    json.username post.user.username
    # Add profile pic link
  end

  json.comments do
    json.array!(post.comments) do |comment|
      json.body comment.body
      json.username comment.author.username
    end
  end

  json.likes do
    json.total post.likers.length
    json.likers do
      json.array!(post.likers.take(5)) do |liker|
        json.username liker.username
      end
    end
  end
end
