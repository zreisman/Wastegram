json.array!(@posts) do |post|
  json.id post.id
  json.body post.body
  json.image_url post.image_url
  json.author_id post.author_id
  json.created_at post.created_at.to_time.to_i

  json.author do
    json.id post.user.id
    json.image_url post.user.profile_picture.image_url
    json.thumb_url post.user.profile_picture.thumb_url
    json.username post.user.username
    json.when time_ago_in_words(post.created_at)
    # Add profile pic link
  end

  json.comments do
    json.array!(post.comments) do |comment|
      json.id comment.id
      json.body comment.body
      json.username comment.author.username
    end
  end

  json.num_likes post.likers.length

  if post.likers.include?(current_user)
    # json.like post.id
    json.like post.likes.find_by(liker_id: current_user.id).id
  else
    json.like nil
  end

  # json.likers do
  #   json.array!(post.likers.take(5)) do |liker|
  #     json.username liker.username
  #     json.id liker.id
  #   end
  # end

end
