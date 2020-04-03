class CmypageController < ApplicationController
  before_action :authenticate_c_user!
  # before_action :configure_permitted_parameters, if: :devise_controller?
  def follow
    # まだ
  end
  def follower
    
  end

  def search

  end

  def find
    
  end

  def community
    
  end

  def user
    
  end

  def match
    
  end

  def select_match
    
  end

  def match_approvement
    
  end

  def show_user
    # binding.pry
    @create_id = params[:create_id].to_s
    @users = []
    user_ids = []
    # @follows = current_c_user.follows.where(bool: 1)
    follows = current_c_user.follows.where(bool: 1)
    follows.each do |follow|
      if user_ids.include?(follow.user_id)
      else
        user_ids << follow.user_id
      end
    end
    user_ids.each do |user_id|
      @users << User.find(user_id)
    end
  end

  def get_user_id
    user_id = params[:user_id].to_i
    @select_id = params[:select_id].to_i
    @user = User.find(user_id)
  end

  # protected
  # def configure_permitted_parameters
  #   # sign_up時にnameのストロングパラメータを追加
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :nickname])
  #   # アカウント編集時にnameとprofileのストロングパラメータを追加
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:username, :nickname, :profile])
  # end
end