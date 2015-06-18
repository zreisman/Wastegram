User.create(username: "sherrif", email: 'rick.grimes@dead.organ', password: 'password', activated: true)
User.create(username: "coral", email: 'carl.grimes@dead.organ', password: 'password', activated: true)
User.create(username: "michonne", email: 'michonne@dead.organ', password: 'password', activated: true)
User.create(username: "carol", email: 'carol@dead.organ', password: 'password', activated: true)
User.create(username: "glenn", email: 'glenn.rhee@dead.organ', password: 'password', activated: true)
User.create(username: "deerhunter9000", email: 'daryl.dixon@dead.organ', password: 'password', activated: true)
User.create(username: "magpie", email: 'maggie.green@dead.organ', password: 'password', activated: true)



User.all.each do |user|
  5.times do |n|
    user.posts.create!(body: Faker::Hacker.say_something_smart,
                       image_url: Faker::Avatar.image(SecureRandom.urlsafe_base64(8), "500x500")
                       )
  end

  user.build_profile_picture(image_url: "http://res.cloudinary.com/dvd7awvbl/image/upload/c_limit,w_300/v1434576931/t604klj869c13xolh9pf.png",
    thumb_url: "http://res.cloudinary.com/dvd7awvbl/image/upload/c_limit,w_100/v1434576931/t604klj869c13xolh9pf.png")
  user.save!
end

Post.all.each do |post|
  3.times do |n|
    user_id = rand(User.all.length) + 1
    post.comments.create(body: Faker::Hacker.say_something_smart, author_id: user_id)
  end
end
