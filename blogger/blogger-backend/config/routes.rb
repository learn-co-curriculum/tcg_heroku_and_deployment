Rails.application.routes.draw do
  post '/login', to: 'auth#login'

  resources :users
  resources :posts
  resources :comments
end
