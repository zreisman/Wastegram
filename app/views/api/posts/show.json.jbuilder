json.id @post.id
json.body @post.body
json.image_url @post.image_url
json.author_id @post.author_id

json.author do
  json.id @post.user.id
  json.username @post.user.username
  json.when time_ago_in_words(@post.created_at)
  json.image_url @post.user.profile_picture.image_url
  json.thumb_url @post.user.profile_picture.thumb_url
end

json.comments do
  json.array!(@post.comments) do |comment|
    json.body comment.body
    json.username comment.author.username
  end
end

json.num_likes @post.likers.length

if @post.likers.include?(current_user)
  json.like @post.id
else
  json.like nil
end
