class CUser < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  # model_relationship
  has_many :follows
  has_many :matches
  has_many :messages

  # validates :username, presence: true
  validates :profile, length: { maximum: 200 }
end
