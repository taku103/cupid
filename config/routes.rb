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
  resources :mypage do
    collection do
      get "search"
    end
    collection do
      get "match"
    end
    collection do
      get "follow"
    end
    collection do
      get "find"
    end
    collection do
      get "community"
    end
    collection do
      post "create_follow"
    end 
    collection do
      post "destroy_follow"
    end
  end
  resources :cmypage do
    collection do
      get "follower"
    end
    collection do
      get "search"
    end
    collection do
      get "find"
    end
    collection do
      get "community"
    end
    collection do
      get "user"
    end
    collection do
      get "match"
    end
  end
  
  # resources :messages
  resources :groups do
    resources :messages
  end
  resources :informations, only: [:index]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
