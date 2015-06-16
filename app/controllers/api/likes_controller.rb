class Api::LikesController < ApplicationController
  def create
    @like = current_user.likes.new(post_id: params[:post_id])
    if @like.save
      render :show
    else
      render json: {}, status: 422
    end
  end

  def destroy
    debugger
  end
end
