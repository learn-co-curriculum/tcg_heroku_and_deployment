class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  before_action :authenticate

  private

  def current_user
    @current_user ||= authenticate
  end

  def authenticate
    # mod 2 version
    # if session[:user_id].nil?
    # redirect_to :login
    # end
    authenticate_or_request_with_http_token do |token|
      begin
        decoded = decode(token)
        @current_user = User.find_by(id: decoded[0]["user_id"])
      rescue JWT::DecodeError
        render json: { authorized: false }, status: 401
      end
    end
  end

  def secret_key
    ENV['TOKEN_AUTH_SECRET']
  end

  def encode(payload)
    JWT.encode(payload, secret_key, 'HS256')
  end

  def decode(token)
    JWT.decode(token, secret_key, true, { algorithm: 'HS256' })
  end
end
