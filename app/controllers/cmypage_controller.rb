class CmypageController < ApplicationController
  before_action :authenticate_c_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  
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

  private
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :nickname])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :nickname, :profile])
  end
end