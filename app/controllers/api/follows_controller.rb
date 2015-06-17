class Api::FollowsController < ApplicationController

  def create
    follow = current_user.follows.new(followed_id: params[:followed_id])
       # TODO: don't need to set follower_id
    if follow.save
      render json: follow, status: 200
      # TODO: render the follow object
    else
      render json: {}, status: 422
    end
  end

  def destroy
    follow = Follow.find(params[:id])
    if follow.destroy
      render json: follow
    else
      render json: {}, status: 404
    end
  end

  def index

  end


end
