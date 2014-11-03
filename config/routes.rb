Rails.application.routes.draw do


  devise_for :users

  get 'home/index'
  post 'my_survivor/' => 'survivors#create'
  get 'my_survivor/' => 'survivors#new'
  get 'play/' => 'play#index'
  get 'play/:zone_code' => 'play#index'

  root to: "home#index"
end
