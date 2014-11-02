Rails.application.routes.draw do


  devise_for :users

  get 'home/index'
  get 'my_survivor/' => 'survivors#new'
  get 'play/' => 'play#index'

  root to: "home#index"
end
