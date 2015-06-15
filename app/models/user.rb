class User < ActiveRecord::Base
  validates :username, :email, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 8, allow_nil: true }

  has_many(
    :posts,
    class_name: 'Post',
    foreign_key: :author_id,
    primary_key: :id
  )

  has_many(
    :follows,
    class_name: 'Follow',
    foreign_key: :follower_id,
    primary_key: :id
  )

  has_many(
    :followings,
    class_name: 'Follow',
    foreign_key: :followed_id,
    primary_key: :id
  )

  has_many(
    :followed,
    through: :follows,
    source: :followed
  )

  has_many(
    :followers,
    through: :followings,
    source: :follower
  )

  has_one(
    :profile_picture,
    class_name: 'Image',
    foreign_key: :owner_id,
    primary_key: :id
  )

  has_many(
    :comments,
    class_name: 'Comment',
    foreign_key: :author_id,
    primary_key: :id
  )

  has_many(
    :likes,
    class_name: 'Like',
    foreign_key: :liker_id,
    primary_key: :id
  )

  after_initialize :ensure_session_token, :ensure_activation_token

  attr_reader :password

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    if user && user.is_password?(password) && user.activated
      return user
    else
      return nil
    end
  end

  def self.activate_user(token)
    user = User.find_by(activation_token: token)
    if user
      user.activated = true
      user.save!
      return true
    else
      return false
    end
  end

  def self.find_by_session_token(token)
    User.where(session_token: token)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_activation_token
    self.activation_token ||= SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
