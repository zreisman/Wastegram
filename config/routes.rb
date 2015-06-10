Rails.application.routes.draw do
  root "static_pages#index"
  resources :users
  resource :session
  match '/activate/:activation_token', :to => 'sessions#activate', via: :get

end
