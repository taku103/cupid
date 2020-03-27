class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  # model_relationships
  has_many :match_users
  has_many :messages
  has_many :matches, through: :match_users
  has_many :follows

  # validates :username, presence: true
  validates :profile, length: { maximum: 200 }
end
