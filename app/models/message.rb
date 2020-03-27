class Message < ApplicationRecord
  belongs_to :user
  belongs_to :c_user
  belongs_to :match
end
