class Api::MessagesController < ApplicationController
  def index_1
    last_id = params[:last_id].to_i
    match_id = params[:match_id].to_i
    matches = Match.where(id: match_id)
    user_id = 0
    matches.each do |match|
      match.match_users.each do |match_user|
        if match_user.user_id != current_user.id
          user_id = match_user.user_id
        end
      end
    end
    @user = User.find(user_id)
    @messages = Message.where(user_id: user_id, bool: 1).where("id > ?", last_id)
  end
  def index_2
    last_id = params[:last_id].to_i
    c_user_id = params[:c_user_id].to_i
    @c_user = CUser.find(c_user_id)
    @messages = []
    messages = Message.where(match_c_user_id: c_user_id, user_id: current_user.id, bool: 2).where("id > ?", last_id)
    messages.each do |message|
      @messages << message
    end
  end
  def index_c
    user_id = params[:user_id].to_i
    last_id = params[:last_id].to_i
    @messages = []
    messages = Message.where(user_id: user_id, match_c_user_id: current_c_user.id, bool: 0).where("id > ?", last_id)
    messages.each do |message|
      @messages << message
    end
    @user = User.find(user_id)
  end
end