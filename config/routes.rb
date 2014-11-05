Rails.application.routes.draw do


  devise_for :users

  get 'home/index'
  post 'my_survivor/' => 'survivors#create'
  get 'my_survivor/' => 'survivors#new'

  get 'play/' => 'play#index'
  get 'play/get_zone' => 'play#get_zone'

  root to: "home#index"
end
