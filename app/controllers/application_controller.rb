class ApplicationController < ActionController::Base
  # before_action :authenticate_c_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  def after_sign_in_path_for(resources)
    case resources
    when User
      search_mypage_index_path
    when CUser
      search_cmypage_index_path
    end
  end
  protected
  def configure_permitted_parameters
    # sign_up時にnameのストロングパラメータを追加
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :nickname])
    # アカウント編集時にnameとprofileのストロングパラメータを追加
    devise_parameter_sanitizer.permit(:account_update, keys: [:username, :nickname, :profile])
  end
end
