class AuthController < ApplicationController

  skip_before_action :authenticate, only: [:login]

  # post to /login with { username: 'some name', password: 'some password' }
  def login
    user = User.find_by(handle: params[:username])
    if user && user.authenticate(params[:password])
      # What goes here?
      # session[:user_id] = user.id
      token = encode({user_id: user.id})
      render json: { token: token, success: true }
    else
      # What about here?
      # indicate some kind of error
      # probably only one kind of error
      render json: { success: false }, status: 401
    end
  end
end
