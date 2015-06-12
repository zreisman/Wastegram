# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


names = ['Jamie Lannister', 'Tyrion Lannister', 'Rob Start', 'Tywin Lannister', 'John Snow']


5.times do |n|
  username = Faker::Internet.user_name(names[n], %w(. _ -))
  email = "#{username}@westeros.com"
  password = "password"

  User.create!(username: username,
    email: email,
    password: password,
    activated: true
  )
end

User.create(username: 'johnnyfive', email: 'johnny@five.com', password: 'password');

User.all.each do |user|
  5.times do |n|
    user.posts.create!(body: Faker::Hacker.say_something_smart,
                       image_url: Faker::Avatar.image(SecureRandom.urlsafe_base64(8), "500x500")
                       )
  end
end
