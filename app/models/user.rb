class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable
  
  # model_relationships
  has_many :match_users
  has_many :messages
  has_many :matches, through: :match_users
  has_many :follows

  # validates :username, presence: true
  validates :profile, length: { maximum: 200 }

  # FACEBOOK認証追記
  def self.find_for_oauth(auth)
    user = User.where(uid: auth.uid, provider: auth.provider).first
    unless user
      user = User.create(
        uid:      auth.uid,
        provider: auth.provider,
        email:    auth.info.email,
        name:     auth.info.name,
        image:    auth.info.image,
        password: Devise.friendly_token[0, 20]
      )
    end
    user
  end
  
end
