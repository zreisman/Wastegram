json.array!(@users) do |user|
  json.id user.id
  json.username user.username
  if user.followers.include?(current_user)
    json.follow user.followings.find_by(follower_id: current_user.id).id
  else
    json.follow nil
  end
end
