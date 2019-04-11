class CommentsController < ApplicationController
  skip_before_action :authenticate, only: [:show]

  def create
    render json: Comment.create(comment_params)
  end

  def destroy
    render json: Comment.find(params[:id]).destroy
  end

  def show
    render json: Comment.find(params[:id])
  end

  private
  def comment_params
    params.permit(:body, :user_id, :post_id)
  end
end
