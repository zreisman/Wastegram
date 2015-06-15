class Post < ActiveRecord::Base
  validates :author_id, :image_url, presence: true

  belongs_to(
    :user,
    class_name: 'User',
    foreign_key: :author_id,
    primary_key: :id
  )

  has_one(
    :image,
    class_name: 'Image',
    foreign_key: :owner_id,
    primary_key: :id
  )

  has_many(
    :comments,
    class_name: 'Comment',
    foreign_key: :post_id,
    primary_key: :id
  )



end
