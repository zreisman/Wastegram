class Api::FollowsController < ApplicationController

  def create
    follow = current_user.follows.new(
       followed_id: params[:followid],
       follower_id: current_user.id )
       # TODO: don't need to set follower_id
    if follow.save
      render json: {}, status: 200
      # TODO: render the follow object
    else
      render json: {}, status: 422
    end
  end

  def destroy
  end

  def index

  end


end
