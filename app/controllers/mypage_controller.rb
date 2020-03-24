class MypageController < ApplicationController
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  def index
    
  end

  def match
    # @group = Group.new
    # @message = Messages.new
  end

  def find
    
  end

  def community
    
  end

  def follow

  end

  def search
    
  end
  protected
  def configure_permitted_parameters
    # sign_up時にnameのストロングパラメータを追加
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :nickname])
    # アカウント編集時にnameとprofileのストロングパラメータを追加
    devise_parameter_sanitizer.permit(:account_update, keys: [:username, :nickname, :profile])
  end
end
