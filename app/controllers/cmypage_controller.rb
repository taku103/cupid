class CmypageController < ApplicationController
  before_action :authenticate_c_user!
  # before_action :configure_permitted_parameters, if: :devise_controller?
  def follow
    # まだ
  end

  def follower
    
  end

  def create_follow
    follow_backs = Follow.where(follow_params).where(bool: [0, 1])
    follows = Follow.where(follow_params).where(bool: 2)
    if follow_backs.present?
      follow_backs.each do |follow|
        follow.destroy
      end
      @follow = current_c_user.follows.new(follow_bool_params)
    else
      if follows.present?
        follows.each do |follow|
          follow.destroy
        end
      end
      @follow = current_c_user.follows.new(follow_two_bool_params)
    end
    if @follow.save
      respond_to do |format|
        format.json
      end
    end
  end

  def destroy_follow
    follows = current_c_user.follows.where(destroy_follow_params)
    @follow = follows.first()
    my_follows = follows.where(bool: 2)
    each_other_follows = follows.where(bool: [0, 1])
    if my_follows.present?
      my_follows.each do |follow|
        follow.destroy
      end
    else
      if each_other_follows.present?
        each_other_follows.each do |follow|
          follow.destroy
        end
      end
      @follow = current_c_user.follows.create(destroy_follow_zero_bool_params)
    end
    respond_to do |format|
      format.json
    end
  end

  def search
    @follow = Follow.new
    @users = []
    users = User.limit(32)
    users.each do |user|
      if @users.include?(user)
      else
        @users << user
      end
      if @users.length >= 16
        break
      end
    end
  end

  def find
    
  end

  def community
    
  end

  def user
    
  end

  def match
    matches = current_c_user.matches
    @items = []
    matches.each do |match|
      match.users.each do |user|
        item = {}
        if @items.present?
          @items.each_with_index do |already_item, i|
            if already_item[:user].id != user.id && @items.length != i + 1

            elsif already_item[:user].id == user.id
              break
            elsif already_item[:user].id != user.id && @items.length == i + 1
              item[:user] = user
            end
          end
        else
          item[:user] = user
        end
        @items << item
      end
    end
  end

  def show_message
    matches = []
    c_matches = current_c_user.matches
    user_id = params[:user_id].to_i
    @user = User.find(user_id)
    c_matches.each do |match|
      match.match_users.each do |match_user|
        if match_user.user_id == user_id      
          m = Match.find(match.id)
          matches << m
        end
      end
    end
    @other_users = []
    matches.each do |match|
      match.match_users.each do |match_user|
        if match_user.user_id != user_id
          u = User.find(match_user.user_id)
          @other_users << u
        end
      end
    end
    @messages = []
    send_messages = Message.where(match_c_user_id: current_c_user.id, user_id: user_id, bool: 2)
    get_messages = Message.where(match_c_user_id: current_c_user.id, user_id: user_id, bool: 0)
    send_messages.each do |message|
      @messages << message
    end
    get_messages.each do |message|
      @messages.each_with_index do |array_message, i|
        if message.id < array_message.id
          @messages.insert(i, message)
          break
        elsif message.id > array_message.id && @messages.length == i + 1
          @messages.append(message)
        end
      end
    end
  end

  def show_user_message
    user_id = params[:user_id]
    @messages = Message.where(user_id: user_id, match_c_user_id: current_c_user.id, bool: [0, 2])
    @user = User.find(user_id)
  end

  def select_match

  end

  def create_match
    # binding.pry
    user_id_1 = params[:user_id_1]
    user_id_2 = params[:user_id_2]
    match = current_c_user.matches.create(step: 0, memo: params[:memo])
    match_user_1 = match.match_users.create(user_id: user_id_1, content: params[:content1], step: 0)
    match_user_2 = match.match_users.create(user_id: user_id_2, content: params[:content2], step: 0)
    redirect_to action: :confirm_match
  end

  def match_approvement
    
  end

  def confirm_match
    
  end

  def show_user
    # binding.pry
    @create_id = params[:create_id].to_s
    @users = []
    user_ids = []
    # @follows = current_c_user.follows.where(bool: 1)
    follows = current_c_user.follows.where(bool: 1).limit(32)
    i = 0
    follows.each do |follow|
      i += 1
      if i == 17
        break
      end
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
  private
  def follow_params
    params.require(:follow).permit(:user_id)
  end
  def follow_bool_params
    params.require(:follow).permit(:user_id).merge(bool: 1)
  end
  def follow_two_bool_params
    params.require(:follow).permit(:user_id).merge(bool: 2)
  end
  def destroy_follow_params
    params.require(:follow).permit(:user_id)
  end
  def destroy_follow_zero_bool_params
    params.require(:follow).permit(:user_id).merge(bool: 0)
  end
end