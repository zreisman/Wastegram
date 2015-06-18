class Image < ActiveRecord::Base
  validates :image_url, :thumb_url, presence: true

  belongs_to(
    :user,
    class_name: 'User',
    foreign_key: :owner_id,
    primary_key: :id
  )

  belongs_to(
    :post,
    class_name: 'Post',
    foreign_key: :owner_id,
    primary_key: :id
  )

end
