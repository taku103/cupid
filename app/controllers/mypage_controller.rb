class MypageController < ApplicationController
  before_action :authenticate_user!
  # before_action :configure_permitted_parameters, if: :devise_controller?

  def index
    
  end

  def find
    
  end

  def community
    
  end

  def follow
    @bool = "follow"
    @follow = Follow.new
    @my_image = Image.find_by(user_id: current_user.id, bool:0)
    c_users = []
    # フォロー中の人を取得
    user_follows = Follow.where(user_id: current_user.id, bool: [0, 1])
    user_follows.each do |user_follow|
      c_user_id = user_follow.c_user_id
      c_user = CUser.find(c_user_id)
      if c_users.include?(c_user)
      else
        c_users << c_user
      end
    end
    @items = []
    c_users.each do |c_user|
      image = Image.find_by(user_id: c_user.id, bool: 2)
      item = {image: image, c_user: c_user}
      @items << item
    end
  end

  def qualification
    down_age = params[:downage]
    up_age = params[:upage]
    sex = params[:sex]
    if sex == ""
      sex = [0, 1]
    end
    if down_age == ""
      down_age = "18"
    end
    if up_age == ""
      up_age = "100"
    end
    qualification_c_users = CUser.where(sex: sex, age: down_age..up_age)
    c_users =   qualification_c_users.limit(16)
    @my_image = Image.find_by(user_id: current_user.id, bool:0)
    @follow = Follow.new
    @items = []
    c_users.each do |c_user|
      image = Image.find_by(user_id: c_user.id, bool: 2)
      item = {image: image, c_user: c_user}
      @items << item
    end
  end

  def profile
    @my_image = Image.find_by(user_id: current_user.id, bool:0)
    @user = User.new
    @image = Image.new
    @user_info = User.find(current_user.id)
    all_images = Image.where(user_id: current_user.id)
    @main_image = all_images.find_by(bool: 0)
    images = all_images.where(bool: 1)
    @sub_images =[]
    images.each do |image|
      @sub_images << image
    end
  end

  def update_profile
    user = User.find(current_user.id)
    if user.update(update_profile_params)
      redirect_to search_mypage_index_path
    end
  end

  def add_main_image
    user_images = Image.where(user_id: current_user.id, bool: 0)
    user_image = user_images.first
    user_images.each do |image|
      if image != user_image
        image.destroy
      end
    end
    if user_image.present?
      if user_image.update!(add_image_params)
        redirect_to profile_mypage_index_path
      end
    else
      image = Image.new(add_image_params)
      # image = Image.new(image: add_image_params, bool: 0, user_id: current_user.id)
      image.bool = 0
      if image.save!
        redirect_to profile_mypage_index_path
      end
    end
  end

  def add_sub_image
    if Image.new_multiple_image(add_sub_image_params)
      redirect_to profile_mypage_index_path
    end
  end

  def delete_image
    @image_id = params[:id].to_i
    image = Image.find(@image_id)
    @bool = image.bool
    if image.destroy!
      respond_to do |format|
        format.json
      end
    end
  end

  def follower
    @bool = "follower"
    @follow = Follow.new
    c_users = []
    @my_image = Image.find_by(user_id: current_user.id, bool: 0)
    # フォロワーの取得
    user_followers = Follow.where(user_id: current_user.id, bool: [1, 2])
    user_followers.each do |user_follower|
      c_user_id = user_follower.c_user_id
      # @c_users << CUser.find(c_user_id)
      c_user = CUser.find(c_user_id)
      if c_users.include?(c_user)
      else
        c_users << c_user
      end
    end
    @items = []
    c_users.each do |c_user|
      image = Image.find_by(user_id: c_user.id, bool: 2)
      item = {image: image, c_user: c_user}
      @items << item
    end
  end

  def create_follow
    # binding.pry
    follow_backs = current_user.follows.where(follow_params).where(bool: [1, 2])
    follows = current_user.follows.where(follow_params).where(bool: 0)
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
  end

  def match
    @message = Message.new
    @my_image = Image.find_by(user_id: current_user.id, bool: 0)
    @matches_items = []
    matches = current_user.matches.where(step: 1)
    if matches.present?
      matches.each do |match|
        match_items = {}
        match_items[:c_user] = CUser.find(match.c_user_id)
        match.match_users.each do |match_user|
          if match_user.user_id != current_user.id
            match_items[:user] = User.find(match_user.user_id)
          end
        end
        @matches_items.each do |m_items|
          if m_items == match_items
            match_items.clear()
          end
        end
        if match_items.present?
          @matches_items << match_items
        end
      end
    end
    @matches_items.each do |matches_item|
      u_image = Image.find_by(user_id: matches_item[:user].id, bool: 0)
      c_image = Image.find_by(user_id: matches_item[:c_user].id, bool: 2)
      matches_item[:u_image] = u_image
      matches_item[:c_image] = c_image
    end
  end

  def match_approval
    @match = Match.new
    @my_image = Image.find_by(user_id: current_user.id, bool: 0)
    @matches = []
    matches = current_user.matches.where(step: 0)
    matches.each do |match|
      matches_users = {}
      match.match_users.each do |match_user|
        if match_user.user_id != current_user.id
          matches_users[:user] = User.find(match_user.user_id)
        end
      end
      matches_users[:match] = match
      @matches.each do |m|
        if m[:user].id == matches_users[:user].id && m[:match].c_user_id == matches_users[:match].c_user_id
          matches_users.clear()
        end
      end
      if matches_users.present?
        matches_users[:c_user] = CUser.find(matches_users[:match].c_user_id)
        @matches << matches_users
      end
    end
  end

  def approve_match
    match = Match.find_by(approve_match_params)
    match_users = match.match_users
    match_user = nil
    match_users.each do |m_u|
      if m_u.user_id == current_user.id
        match_user = m_u
      end
    end
    match_user.step = 1
    match_user.save
    match.match_users.each do |match_user|
      if match_user.user_id != current_user.id
        if match_user.step == 1
          match.step = 1
          match.save
        end
      end
    end
    # match_userを持たないmatchを削除
    current_user_matches = Match.where(approve_match_c_user_params)
    current_user_matches.each do |unnecessary_match|
      if unnecessary_match.match_users == []
        unnecessary_match.destroy
      end
    end
    current_user_match_users = current_user.match_users
    current_user_match_users.each do |unnecessary_match_user|
      if unnecessary_match_user.match == nil
        match_id = unnecessary_match_user.match_id
        double_match_users = MatchUser.where(match_id: match_id)
        double_match_users.each do |double_match_user|
          double_match_user.destroy
        end
      end
    end
    redirect_to action: :match_approval
  end

  def destroy_match
    matches = Match.where(destroy_match_params)
    matches.each do |match|
      match.destroy
    end
    current_user_matches = Match.where(destroy_match_c_params)
    current_user_matches.each do |unnecessary_match|
      if unnecessary_match.match_users == []
        unnecessary_match.destroy
      end
    end
    current_user_match_users = current_user.match_users
    current_user_match_users.each do |unnecessary_match_user|
      if unnecessary_match_user.match == nil
        match_id = unnecessary_match_user.match_id
        double_match_users = MatchUser.where(match_id: match_id)
        double_match_users.each do |double_match_user|
          double_match_user.destroy
        end
      end
    end
    redirect_to action: :match_approval
  end

  def create_message
    @message = Message.new(create_message_params)
    if @message.save
      respond_to do |format|     
        format.json
      end
    end
  end

  def show_message
    @message = Message.new
    @items = []
    @messages = []
    matches = current_user.matches.where(c_user_id: params[:c_user_id])
    matches.each do |match|
      match.match_users.each do |match_user|
        if match_user.user_id != current_user.id
          user = User.find(match_user.user_id)
          image = Image.find_by(user_id: user.id, bool: 0)
          item = { user: user, image: image }
          @items << item
        end
      end
    end
    
    @c_user = CUser.find(params[:c_user_id])
    @c_image = Image.find_by(user_id: params[:c_user_id], bool: 2)
    # matches = Match.where(match_c_user_id: params[:c_user_id])
    messages = Message.where(bool: [0, 2], match_c_user_id: params[:c_user_id], user_id: current_user.id)
    messages.each do |message|
      @messages << message
    end

    respond_to do |format|
      format.json
    end
  end

  def show_user_message
    matches = current_user.matches
    @messages = []
    other_user_id = params[:user_id].to_i
    @image = Image.find_by(user_id: other_user_id, bool: 0)
    @user = User.find(other_user_id)
    matches.each do |match|
      match.match_users.each do |match_user|
        
        if match_user.user_id == other_user_id
          @match_id = match_user.match_id
        end
      end
    end
    get_messages = Message.where(match_c_user_id: @match_id, user_id: other_user_id, bool: 1)
    send_messages = Message.where(match_c_user_id: @match_id, user_id: current_user.id, bool: 1)
    get_messages.each do |get_message|
      @messages << get_message
    end
    send_messages.each do |send_message|
      @messages.each_with_index do |message, i|
        if message.id > send_message.id
          @messages.insert(i, send_message)
          break
        elsif @messages.length == i + 1
          @messages.append(send_message)
          break
        end
      end
    end
  end

  def search
    @element_per_page = 2
    @all_c_user_length = CUser.all.length
    @c_users = CUser.page(params[:page]).per(@element_per_page)
    @my_image = Image.find_by(user_id: current_user.id, bool: 0)
    @follow = Follow.new
    i = 0
    @items = []
    @c_users.each do |c_user|
      image = Image.find_by(user_id: c_user.id, bool: 2)
      item = {image: image, c_user: c_user}
      @items << item
    end
  end

  def skyway
    @c_user_id = 0
    @user_id = 0
    @c_user_id = params[:c_user_id].to_i
  end

  def create_skyway
    c_user_id = params[:c_user_id].to_i
    skyways = Skyway.where(bool: 1, user_c_user_id: current_user.id)
    # binding.pry
    if skyways.length != 0
      @bool = 1
      @skyway = skyways.last
      skyways.each do |skyway|
        skyway.destroy
      end
    elsif skyways.length == 0
      skyway_code = params[:skyway_code]
      @bool = 0
      @skyway = Skyway.create(bool: 0, user_c_user_id: c_user_id, code: skyway_code)
    end
  end

  def show_c_detail
    c_user_id = params[:c_user_id]
    @c_user = CUser.find(c_user_id)
    @image = Image.find_by(user_id: c_user_id, bool: 2)
    @sub_images = Image.where(user_id: c_user_id, bool: 3)
    @student_length = current_user.follows.where(bool: 1).length
    @follower_length = current_user.follows.where(bool: [1, 2]).length
  end

  def end_call
    redirect_to action: :match
  end

  def after_sign_in_path_for(resources)
    search_mypage_index_path
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
  def approve_match_c_user_params
    params.require(:match).permit(:c_user_id)
  end
  def destroy_match_params
    params.require(:match).permit(:id)
  end
  def destroy_match_c_params
    params.require(:match).permit(:c_user_id)
  end
  def approve_match_params
    params.require(:match).permit(:id)
  end
  def create_message_params
    params.require(:message).permit(:bool, :content, :image, :match_c_user_id, :user_id)
  end
  def update_profile_params
    params.require(:user).permit(:profile, :username, :nickname, :sex, :age, :comment)
  end
  def add_image_params
    params.require(:image).permit(:image).merge(user_id: current_user.id)
  end
  def add_sub_image_params
    params.require(:image).permit(image: []).merge(user_id: current_user.id)
  end
end
