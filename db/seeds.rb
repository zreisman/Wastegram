profile_pictures = {
"sherrif" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_fill,h_300,w_300/i5fufx4ouu5gjdavxgzh.png",
"michonne" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_fill,h_300,w_300/eehhw4agl8vhgitxwpqi.jpg",
"coral" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_fill,h_300,w_300/ttqgaopixx6aofkcvakj.jpg",
"magpie" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_fill,h_300,w_300/kxrv2avetle0cw7wpdpr.png",
"deerhunter9000" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_fill,h_300,w_300/z2l2nfvaowdeqvsmfyx5.png",
"bethe" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_fill,h_300,w_300/eqmmohyxfeduf6nsdsuw.jpg",
"carol" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_fill,h_300,w_300/enlialgapjksbqfism6k.jpg",
"default" => "http://res.cloudinary.com/dvd7awvbl/image/upload/c_limit,h_300,w_300/v1434576931/t604klj869c13xolh9pf.png"
}

User.create(username: "sherrif", email: 'rickgrimes@dead.org', password: 'password', activated: true)
User.create(username: "coral", email: 'carl.grimes@dead.org', password: 'password', activated: true)
User.create(username: "michonne", email: 'michonne@dead.org', password: 'password', activated: true)
User.create(username: "carol", email: 'carol@dead.org', password: 'password', activated: true)
User.create(username: "bethe", email: 'beth.green@dead.org', password: 'password', activated: true)
User.create(username: "deerhunter9000", email: 'daryl.dixon@dead.org', password: 'password', activated: true)
User.create(username: "magpie", email: 'maggie.green@dead.org', password: 'password', activated: true)

User.find_by(username: "bethe").posts.create(
  image_url: "http://res.cloudinary.com/dvd7awvbl/image/upload/c_scale,w_600/idkghwwqg6tsxvyihrte.jpg",
  body: "New hair cut!")


User.find_by(username: "carol").posts.create(
  image_url: "http://res.cloudinary.com/dvd7awvbl/image/upload/c_scale,w_600/mwysqpjikstacaw7sdkw.jpg",
  body: "Lookout duty")

User.find_by(username: "deerhunter9000").posts.create(
  image_url: "http://res.cloudinary.com/dvd7awvbl/image/upload/c_scale,w_600/ykotlikxpx2vsox2ai24.jpg",
  body: "Check out ma sweet hog")

User.find_by(username: "deerhunter9000").posts.create(
  image_url: "http://res.cloudinary.com/dvd7awvbl/image/upload/c_scale,w_600/ant08cbigunagghqlhhg.png",
  body: "Cleaning my crossbow")

User.find_by(username: "bethe").posts.create(
  image_url: "http://res.cloudinary.com/dvd7awvbl/image/upload/c_scale,w_600/mg3af4uz8owqa1rzawqo.jpg",
  body: "Tickling the ivories!")

User.find_by(username: "coral").posts.create(
  image_url: "http://res.cloudinary.com/dvd7awvbl/image/upload/c_scale,w_600/nnf5v2usse7515nhlxwb.jpg",
  body: "I found this place yesterday. Let's see if there are supplies!")

User.find_by(username: "michonne").posts.create(
  image_url: "http://res.cloudinary.com/dvd7awvbl/image/upload/c_scale,w_600/riwl28vpb44y4edyhplv.jpg",
  body: "Don't even...")

User.find_by(username: "sherrif").posts.create(
  image_url: "http://res.cloudinary.com/dvd7awvbl/image/upload/c_scale,w_600/lnnrvczzmh7mdsprjkn7.jpg",
  body: "Anyone want to play scrabble later? Coral?")






User.all.each do |user|
  # 5.times do |n|
  #   user.posts.create!(body: Faker::Hacker.say_something_smart,
  #                      image_url: Faker::Avatar.image(SecureRandom.urlsafe_base64(8), "500x500")
  #                      )
  # end

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
