Rails.application.routes.draw do
  devise_for :c_users, controllers:{
    sessions:       'c_users/sessions',
    passwords:      'c_users/passwords',
    registrations:  'c_users/registrations'
  }
  devise_for :users, controllers:{
    sessions:       'users/sessions',
    passwords:      'users/passwords',
    registrations:   'users/registrations',
    omniauthcallbacks: 'users/omniauth_callbacks'
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
    collection do
      get "follower"
    end
    collection do
      get "match_approval"
    end
    collection do
      post "approve_match"
    end
    collection do
      post "destroy_match"
    end
    collection do
      get "show_message"
    end
    collection do
      post "create_message"
    end
    collection do
      get "show_user_message"
    end
    collection do
      get "skyway"
    end
    collection do
      get "create_skyway"
    end
    collection do
      get "show_c_detail"
    end
    collection do
      post "end_call"
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
    collection do
      get "follow"
    end
    collection do
      post "create_match"
    end
    collection do
      get "match_approvement"
    end
    collection do
      get "select_match"
    end
    collection do
      get "show_user"
    end
    collection do
      get "get_user_id"
    end
    collection do
      get "confirm_match"
    end
    collection do
      post "destroy_follow"
    end
    collection do
      post "create_follow"
    end
    collection do
      post "create_message"
    end
    collection do
      get "show_message"
    end
    collection do
      get "show_user_message"
    end
    collection do
      get "skyway"
    end
    collection do
      get "create_skyway"
    end
    collection do
      get "show_detail"
    end
    collection do
      post "end_call"
    end
  end
  namespace :api do
    resources :messages do
      collection do
        get "index_1"
      end
      collection do
        get "index_2"
      end
      collection do
        get "index_c"
      end
    end
  end
  # resources :messages
  resources :groups do
    resources :messages
  end
  resources :informations, only: [:index]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
