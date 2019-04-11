class UsersController < ApplicationController
  skip_before_action :authenticate, only: [:show, :index]

  def show
    render json: User.find(params[:id])
  end

  def index
    render json: User.all
  end
end
