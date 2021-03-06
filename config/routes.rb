Rails.application.routes.draw do
  root "static_pages#index"
  resources :users
  resource :session
  match '/activate/:activation_token', :to => 'sessions#activate', via: :get
  namespace :api do
    resources :posts
    resources :follows, only: [:create, :destroy]
    resources :comments, only: [:create]
    resources :likes, only: [:create, :destroy]
    resources :users, only: [:create, :update]
    match '/usersearch', :to => 'users#search', via: :post
    match '/usersearch', :to => 'users#current', via: :get
  end
end
