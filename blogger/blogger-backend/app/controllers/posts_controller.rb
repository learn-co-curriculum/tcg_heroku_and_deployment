class PostsController < ApplicationController
  skip_before_action :authenticate, only: [:show, :index]

  def index
    render json: Post.all
  end

  def show
    render json: Post.find(params[:id])
  end

  def create
    render json: Post.create(post_params)
  end

  private
  def post_params
    params.permit(:user_id, :body, :title, :slug)
  end
end
