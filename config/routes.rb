Rails.application.routes.draw do
  root "static_pages#index"
  resources :users
  resource :session
  match '/activate/:activation_token', :to => 'sessions#activate', via: :get
  namespace :api do
    resources :posts
    resources :follows, only: [:create, :destroy]
    resources :comments, only: [:create]
    match '/usersearch', :to => 'users#search', via: :post
  end
end
