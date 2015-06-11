class Post < ActiveRecord::Base
  validates :author_id, :image_url, presence: true

  belongs_to(
    :user,
    class_name: 'User',
    foreign_key: :author_id,
    primary_key: :id
  )



end
