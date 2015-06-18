class Api::UsersController < ApplicationController

  def create
    debugger
  end

  def search
    #vulnerable to SQL injection?
    @users = User.where('username ILIKE ?', "%#{params[:search]}%").limit(5)
    if @users.count < 1
      render nothing: true, status: 200
    else
      render :search
    end
  end

  def current
    render :current
  end

  def update
    @user = User.find(params[:id])
    image_url = params[:image_url]
    thumb_url = params[:thumb_url]
    if @user.profile_picture.update(image_url: image_url, thumb_url: thumb_url)
      render :show
    else
      render json: {}, status: 422
    end
  end

  private

  def search_params
    params.permit(:search)
  end


end
