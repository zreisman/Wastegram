# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


5.times do |n|
  username = "user#{n}"
  email = "#{username}@example.com"
  password = "password"

  User.create!(username: username,
    email: email,
    password: password,
    activated: true
  )
end

User.all.each do |user|
  5.times do |n|
    user.posts.create!(body: "body 1", image_url: "www.google.com")
  end
end
