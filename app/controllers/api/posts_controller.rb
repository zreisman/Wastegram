class Api::PostsController < ApplicationController

  def create

  end

  def index
    render :json => current_user.posts
  end

  def show

  end

  def destroy

  end

  def update

  end


end
