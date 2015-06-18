profile_pictures = {
"sherrif" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_fill,h_300,w_300/i5fufx4ouu5gjdavxgzh.png",
"michonne" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_fill,h_300,w_300/eehhw4agl8vhgitxwpqi.jpg",
"coral" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_fill,h_300,w_300/ttqgaopixx6aofkcvakj.jpg",
"magpie" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_fill,h_300,w_300/kxrv2avetle0cw7wpdpr.png",
"deerhunter9000" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_fill,h_300,w_300/z2l2nfvaowdeqvsmfyx5.png",
"bettysings" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_fill,h_300,w_300/eqmmohyxfeduf6nsdsuw.jpg",
"carol" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_fill,h_300,w_300/enlialgapjksbqfism6k.jpg",
"default" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_limit,h_300,w_300/v1434576931/t604klj869c13xolh9pf.png"
}

User.create(username: "sherrif", email: 'rick.grimes@dead.org', password: 'password', activated: true)
User.create(username: "coral", email: 'carl.grimes@dead.org', password: 'password', activated: true)
User.create(username: "michonne", email: 'michonne@dead.org', password: 'password', activated: true)
User.create(username: "carol", email: 'carol@dead.org', password: 'password', activated: true)
User.create(username: "bettysings", email: 'beth.green@dead.org', password: 'password', activated: true)
User.create(username: "deerhunter9000", email: 'daryl.dixon@dead.org', password: 'password', activated: true)
User.create(username: "magpie", email: 'maggie.green@dead.org', password: 'password', activated: true)


User.all.each do |user|
  5.times do |n|
    user.posts.create!(body: Faker::Hacker.say_something_smart,
                       image_url: Faker::Avatar.image(SecureRandom.urlsafe_base64(8), "500x500")
                       )
  end

  pic = profile_pictures[user.username]
  thumb = pic.split("h_300,w_300").join("h_100,w_100")

  user.build_profile_picture(image_url: pic, thumb_url: thumb)
  user.save!
end

Post.all.each do |post|
  3.times do |n|
    user_id = rand(User.all.length) + 1
    post.comments.create(body: Faker::Hacker.say_something_smart, author_id: user_id)
  end
end
