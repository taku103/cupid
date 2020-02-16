Rails.application.routes.draw do
  devise_for :c_users, controllers:{
    sessions:       'c_users/sessions',
    passwords:      'c_users/passwords',
    registrations:  'c_users/registrations'
  }
  devise_for :users, controllers:{
    sessions:       'users/sessions',
    passwords:      'users/passwords',
    registrations:   'users/registrations'
  }
  root "informations#index"
  resources :messages
  resources :informations, only: [:index]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
