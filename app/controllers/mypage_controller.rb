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

  def create_follow
    # binding.pry
    @follow = current_user.follows.new(follow_params)
    if @follow.save
      respond_to do |format|
        format.json
      end
      # redirect_to action: :search
    end
  end

  def destroy_follow
    @follows = Follow.where(destroy_follow_params)
    @follows.each do |follow|
      follow.destroy
    end
    @follow = @follows.first()
    respond_to do |format|
      format.json
    end
    # redirect_to action: :search

    # if @follows.destroy
    #   respond_to do |format|
    #     format.json
    #   end
    # elsif
    #   binding.pry
    # end
  end

  def search
    @c_users = CUser.all.limit(16)
    @follow = Follow.new
    i = 0
    # eachでc_userをrenderするのはsearch.html.hamlに書く(そのあとmodelに書いてメソッドとして呼び出す)
    
    # @c_users.each do |c_user|
    #   
    # end
    # def attach_follow_function
    #   c_user.follows
    # end
  end

  protected
  def configure_permitted_parameters
    # sign_up時にnameのストロングパラメータを追加
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :nickname])
    # アカウント編集時にnameとprofileのストロングパラメータを追加
    devise_parameter_sanitizer.permit(:account_update, keys: [:username, :nickname, :profile])
  end
  private
  def follow_params
    params.require(:follow).permit(:c_user_id)
  end
  def destroy_follow_params
    params.require(:follow).permit(:user_id, :c_user_id)
  end
end
