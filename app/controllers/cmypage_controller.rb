class CmypageController < ApplicationController
  before_action :authenticate_c_user!
  # before_action :configure_permitted_parameters, if: :devise_controller?
  
  def profile
    @my_image = Image.find_by(user_id: current_c_user.id, bool: 2)
    @c_user = CUser.new
    @image = Image.new
    @c_user_info = CUser.find(current_c_user.id)
    all_images = Image.where(user_id: current_c_user.id, bool: [2, 3])
    
    @main_image = all_images.find_by(bool: 2)
    images = all_images.where(bool: 3)
    @sub_images =[]
    images.each do |image|
      @sub_images << image
    end
  end

  def update_profile
    c_user = CUser.find(current_user.id)
    if c_user.update(update_profile_params)
      redirect_to search_cmypage_index_path
    end
  end

  def add_main_image
    c_user_images = Image.where(user_id: current_c_user.id, bool: 2)
    c_user_image = c_user_images.first
    c_user_images.each do |image|
      if image != c_user_image
        image.destroy
      end
    end
    if c_user_image.present?
      if c_user_image.update!(add_image_params)
        redirect_to profile_cmypage_index_path
      end
    else
      image = Image.new(add_image_params)
      # image = Image.new(image: add_image_params, bool: 0, user_id: current_user.id)
      image.bool = 2
      if image.save!
        redirect_to profile_cmypage_index_path
      end
    end
  end

  def add_sub_image
    if Image.c_new_multiple_image(add_sub_image_params)
      redirect_to profile_cmypage_index_path
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

  def follow
    @follow = Follow.new
    @my_image = Image.find_by(user_id: current_c_user.id, bool: 2)
    user_ids = []
    follows = Follow.where(c_user_id: current_c_user.id, bool: [1, 2])
    follows.each do |follow|
      if user_ids.include?(follow.user_id)

      else
        user_ids << follow.user_id
      end
    end
    @items = []
    user_ids.each do |user_id|
      user = User.find(user_id)
      image = Image.find_by(user_id: user_id, bool: 0)
      item = { user: user, image: image }
      @items << item
    end
  end

  def follower
    @my_image = Image.find_by(user_id: current_c_user.id, bool: 2)
    @follow = Follow.new
    user_ids = []
    follows = Follow.where(c_user_id: current_c_user.id, bool: [0, 1])
    follows.each do |follow|
      if user_ids.include?(follow.user_id)

      else
        user_ids << follow.user_id
      end
    end
    @items = []
    user_ids.each do |user_id|
      user = User.find(user_id)
      image = Image.find_by(user_id: user_id, bool: 0)
      item = { user: user, image: image}
      @items << item
    end
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
    @element_per_page = 2
    @my_image = Image.find_by(user_id: current_c_user.id, bool: 2)
    @follow = Follow.new
    original_users = []
    @all_user_length = User.all.length
    @users = User.page(params[:page]).per(@element_per_page)
    @users.each do |user|
      if original_users.include?(user)
      else
        original_users << user
      end
      if original_users.length >= 16
        break
      end
    end
    @items = []
    original_users.each do |user|
      image = Image.find_by(user_id: user.id, bool: 0)
      item = { user: user, image: image}
      @items << item
    end
  end

  def find
    
  end

  def community
    
  end

  def user
    
  end

  def match
    @message = Message.new
    @my_image = Image.find_by(user_id: current_c_user.id, bool: 2)
    matches = current_c_user.matches.where(step: 1)
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
        if item != {}
          @items << item
        end
      end
    end
    @items.each do |item|
      user = item[:user]
      image = Image.find_by(user_id: user.id, bool: 0)
      item[:image] = image
    end
  end

  def show_message
    matches = []
    c_matches = current_c_user.matches.where(step: 1)
    user_id = params[:user_id].to_i
    user = User.find(user_id)
    image = Image.find_by(user_id: user.id, bool: 0)
    @item = { user: user, image:image }
    c_matches.each do |match|
      match.match_users.each do |match_user|
        if match_user.user_id == user_id      
          m = Match.find(match.id)
          matches << m
        end
      end
    end
    @others_items = []
    matches.each do |match|
      match.match_users.each do |match_user|
        if match_user.user_id != user_id
          u = User.find(match_user.user_id)
          image = Image.find_by(user_id: u.id, bool: 0)
          item = { user: u, image: image }
          if @others_items.include?(item)
          else
            @others_items << item
          end
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
    user = User.find(user_id)
    image = Image.find_by(user_id: user_id, bool: 0)
    @item = {user: user, image: image}
  end

  def create_message
    @message = Message.create(create_message_params)
  end

  def select_match
    @my_image = Image.find_by(user_id: current_c_user.id, bool: 2)
  end

  def create_match
    user_id_1 = params[:user_id_1]
    user_id_2 = params[:user_id_2]
    match = current_c_user.matches.create(step: 0, memo: params[:memo])
    match_user_1 = match.match_users.create(user_id: user_id_1, content: params[:content1], step: 0)
    match_user_2 = match.match_users.create(user_id: user_id_2, content: params[:content2], step: 0)
    redirect_to action: :confirm_match
  end

  def match_approvement
    @match_users = []
    @my_image = Image.find_by(user_id: current_c_user.id, bool: 2)
    matches = Match.where(c_user_id: current_c_user.id, step: 0)
    matches.each do |match|
      items = {}
      match.match_users.each_with_index do |match_user, i|
        user_id = match_user.user_id
        step = match_user.step
        user = User.find(user_id)
        if i == 0
          items[:user1] = user
          items[:step1] = step
          items[:image1] = Image.find_by(user_id: user.id, bool: 0)
        elsif i == 1
          items[:user2] = user
          items[:step2] = step
          items[:image2] = Image.find_by(user_id: user.id, bool: 0)
        end
      end
      memo = match.memo
      items[:memo] = memo

      if @match_users.include?(items)
      elsif items[:user1].present?
        @match_users << items
      end
    end
  end

  def confirm_match
    
  end

  def show_user
    @create_id = params[:create_id].to_s
    @items = []
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
      item = {}
      item[:user] = User.find(user_id)
      item[:image] = Image.find_by(user_id: user_id, bool: 0)
      @items << item
    end
  end

  def get_user_id
    user_id = params[:user_id].to_i
    @select_id = params[:select_id].to_i
    @user = User.find(user_id)
    @image = Image.find_by(user_id: user_id, bool: 0)
  end

  def show_detail
    user_id = params[:user_id]
    @user = User.find(user_id)
    @image = Image.find_by(user_id: user_id, bool: 0)
    @sub_images = Image.where(user_id: user_id, bool: 1)
    @student_length = current_c_user.follows.where(bool: 1).length
    @follower_length = current_c_user.follows.where(bool: [0, 1]).length
  end

  def skyway
    @user_id = params[:user_id].to_i
  end

  def create_skyway
    user_id = params[:user_id]
    skyway_code = params[:skyway_code]
    skyways = Skyway.where(user_c_user_id: current_c_user.id, bool: 0)
    if skyways.length != 0
      @bool = 1
      @skyway = skyways.last
      skyways.each do |skyway|
        skyway.destroy
      end
    elsif skyways.length == 0
      skyway = Skyway.create(user_c_user_id: user_id, bool: 1, code: skyway_code)
      @bool = 0
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
    @element_per_page = 2
    @users = User.where(sex: sex, age: down_age..up_age).page(params[:page]).per(@element_per_page)
    @my_image = Image.find_by(user_id: current_user.id, bool: 0)
    @follow = Follow.new
    @items = []
    @users.each do |user|
      image = Image.find_by(user_id: user.id, bool: 0)
      item = {image: image, user: user}
      @items << item
    end
  end

  def end_call
    redirect_to action: :search
  end

  def after_sign_in_path_for(resource)
    search_cmypage_index_path # ログイン後に遷移するpathを設定
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
  def create_message_params
    params.require(:message).permit(:user_id, :bool, :content, :match_c_user_id)
  end
  def update_profile_params
    params.require(:c_user).permit(:profile, :username, :nickname, :sex, :age, :speciality)
  end
  def add_image_params
    params.require(:image).permit(:image).merge(user_id: current_c_user.id)
  end
  def add_sub_image_params
    params.require(:image).permit(image: []).merge(user_id: current_c_user.id)
  end
end