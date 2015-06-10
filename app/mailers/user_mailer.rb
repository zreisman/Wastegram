class UserMailer < ApplicationMailer
  default from: 'Hastigram<admin@hastigram.com>'

  def activation_email(user)
    @user = user
    @url = root_url 
    # "https://murmuring-dusk-1251.herokuapp.com"
    @activation_token  = user.activation_token
    mail(to: user.email, subject: 'Activate Your Hastigram Account!')
  end
end
