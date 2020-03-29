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

  def follower
    @c_users = []
    # フォロワーの取得
    user_followers = Follow.where(user_id: current_user.id, bool: [1, 2])
    user_followers.each do |user_follower|
      c_user_id = user_follower.c_user_id
      @c_users << CUser.find(c_user_id)
    end
  end

  def create_follow
    # binding.pry
    follow_backs = Follow.where(follow_params).where(bool: [1, 2])
    follows = Follow.where(follow_params).where(bool: 0)
    if follow_backs.present?
      follow_backs.each do |follow|
        follow.destroy
      end
      # @follow = current_user.follows.new(follow_bool_params)
      @follow = current_user.follows.new(follow_bool_params)
    else
      if follows.present?
        follows.each do |follow|
          follow.destroy
        end
      end
      @follow = current_user.follows.new(follow_zero_bool_params)
    end
    if @follow.save
      respond_to do |format|
        format.json
      end
      # redirect_to action: :search
    end
  end

  def destroy_follow
    @follows = Follow.where(destroy_follow_params)
    @follow = @follows.first()
    @follows.each do |follow|
      follow.destroy
      if follow.bool == 0
        follow.destroy
      elsif follow.bool == 1
        follow.destroy
        # binding.pry
        Follow.create(destroy_follow_two_bool_params)
        # binding.pry
      elsif follow.bool == 2
        # 相手フォロー時は何もしない
      else
        follow.destroy
      end
    end

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
  def follow_bool_params
    params.require(:follow).permit(:c_user_id).merge(bool: 1)
  end
  def follow_zero_bool_params
    params.require(:follow).permit(:c_user_id).merge(bool: 0)
  end
  def destroy_follow_params
    params.require(:follow).permit(:user_id, :c_user_id)
  end
  def destroy_follow_two_bool_params
    params.require(:follow).permit(:user_id, :c_user_id).merge(bool: 2)
  end
end
