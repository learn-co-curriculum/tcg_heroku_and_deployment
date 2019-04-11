# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

tags = Faker::Lorem.words(20).map do |name|
  Tag.create(name: name)
end

names = ["rob", "melanie", "jake", "erin", "ann", "paul", "bruno"]
users = names.map do |n|
  User.create(handle: n, password: "pw", email: "#{n}@example.com", image_url: Faker::LoremFlickr.image)
end

# create posts and comments
users.each do |user|
  10.times do |i|
    title = Faker::Lorem.sentence(4)
    slug = title.downcase.gsub(/\s/, '-').delete('.')
    post = Post.create(
      user: user,
      title: title,
      body: 10.times.map { Faker::Lorem.paragraph(15, false, 10) }.join("\n\n"),
      slug: slug,
      tags: tags.sample(3),
    )
    3.times do
      Comment.create(user: users.sample, body: Faker::Lorem.sentences(3).join(" "), post: post)
    end
  end
end
