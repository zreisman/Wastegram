class User < ActiveRecord::Base
  validates :username, :email, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 8, allow_nil: true }

  after_initialize :ensure_session_token

  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.where(username: username)
    if user && user.is_password?(password)
      return user
    else
      return nil
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

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= reset_session_token!
  end
end
