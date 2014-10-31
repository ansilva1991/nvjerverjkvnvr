Rails.application.routes.draw do
  devise_for :users

  get 'play/' => 'play#index'
end
