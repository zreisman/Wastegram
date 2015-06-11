class SessionsController < ApplicationController

  def activate
    token = params[:activation_token]
    if !User.activate_user(token)
      flash[:errors] = ["Activation Failed!"]
    end
    redirect_to root_url
  end

  def create
    user = User.find_by_credentials(user_params[:email], user_params[:password])
    if user
      log_in!(user)
      redirect_to root_url
    else
      flash[:errors] = ["Invalid email and password combination"]
      @user = User.new
      render :new
    end
  end

  def new
    @user = User.new
  end
  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
