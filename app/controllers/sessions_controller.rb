class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    user = User.find_by_credentials(user_params[:email], user_params[:password])
    if user.save
      redirect_to root_url
    else
      flash[:errors] = ["Invalid email and password combination"]
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
