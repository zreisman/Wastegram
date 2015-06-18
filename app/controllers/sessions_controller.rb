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
      if user.activated?
        log_in!(user)
        redirect_to root_url
      else
        flash[:errors] = ["Please check your email and activate your account"]
        redirect_to new_session_url
      end
    else
      flash[:errors] = ["Invalid email and password combination"]
      redirect_to new_session_url
    end
  end

  def destroy
    session[:session_token] = nil
    redirect_to new_session_url
  end

  def new
    @user = User.new
  end
  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
