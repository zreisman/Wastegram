class Api::FollowsController < ApplicationController

  def create
    follow = current_user.follows.new(
       followed_id: params[:followid],
       follower_id: current_user.id )
    if follow.save
      render json: {}, status: 200
    else
      render json: {}, status: 422
    end
  end

  def destroy
  end

  def index

  end


end
