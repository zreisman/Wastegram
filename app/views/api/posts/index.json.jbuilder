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
end
