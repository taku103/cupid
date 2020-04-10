class Match < ApplicationRecord
  has_many :match_users, dependent: :destroy
  has_many :users, through: :match_users
  has_many :message
end
