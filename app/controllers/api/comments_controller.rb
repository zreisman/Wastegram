class Api::CommentsController < ApplicationController

  def create
    post = Post.find(comment_params[:post_id])
    if post
      @comment = post.comments.new(body: comment_params[:body],
                             author_id: current_user.id )
      if @comment.save
        render :show
      else
        render json: @comment.errors.full_messages, status: 422
      end
    else
      render json: {}, status: 404
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :post_id)
  end
end
