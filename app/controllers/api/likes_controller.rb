class Api::LikesController < ApplicationController
  def create
    @like = current_user.likes.new(post_id: params[:post_id])
    if @like.save
      render json: @like
    else
      render json: {}, status: 422
    end
  end

  def destroy
    @like = Like.find(params[:id])
    if @like.destroy
      render json: @like
    else
      render json: {}, status: 422
    end
  end
end
