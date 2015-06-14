class Api::UsersController < ApplicationController

  def search
    #vulnerable to SQL injection?
    @users = User.where('username ILIKE ?', "%#{params[:search]}%")
    if @users.count < 1
      render json: {}, status: 200
    else
      render :search
    end
  end

  private

  def search_params
    params.permit(:search)
  end


end
