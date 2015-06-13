class Api::UsersController < ApplicationController

  def search
    @users = User.where('username ILIKE ?', "%#{search_params}%")
    render :search
  end

  private

  def search_params
    params.require(:search)
  end


end
