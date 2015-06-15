User.create(username: "kingslayer", email: 'jamie.lannister@westeros.com', password: 'password', activated: true)
User.create(username: "thewolf", email: 'rob.stark@westerose.com', password: 'password', activated: true)
User.create(username: "sansa-sparkles", email: 'sansa.stark@westeros.com', password: 'password', activated: true)
User.create(username: "theimp", email: 'tyrion.lannister@westeros.com', password: 'password', activated: true)
User.create(username: "bigdaddy", email: 'tywin.lannister@westeros.com', password: 'password', activated: true)



User.all.each do |user|
  5.times do |n|
    user.posts.create!(body: Faker::Hacker.say_something_smart,
                       image_url: Faker::Avatar.image(SecureRandom.urlsafe_base64(8), "500x500")
                       )
  end
end

Post.all.each do |post|
  3.times do |n|
    user_id = rand(User.all.length) + 1
    post.comments.create(body: Faker::Hacker.say_something_smart, author_id: user_id)
  end
end
