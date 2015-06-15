class Api::PostsController < ApplicationController

  def create

    post = Post.new(post_params)
    post.author_id = current_user.id
    if post.save
      render :json => post, status: 200
    else
      render nothing: true, status: 422
    end

  end

  def index
    @posts = Post.all.includes(:comments)
    render :index
    # render :json => Post.all, status: 200
  end

  def show
    post = Post.find(params[:id])
    if post
      render json: post, status: 200
    else
      render json: {}, status: 404  #returning too much info?
    end
  end

  def destroy
    post = Post.find(params[:id])
    if post
      post.destroy()
      render json: post, status: 200
    else
      render json: {}, status: 404  #returning too much info?
    end
  end

  def update
    post = Post.find(params[:id])
    if post
      if post.update(post_params)
        render json: post, status: 200
      else
        render nothing: true, status: 402
      end
    else
      render json: {}, status: 404  #returning too much info?
    end
  end

  private

  def post_params
    params.require(:post).permit(:image_url, :body)
  end

end
