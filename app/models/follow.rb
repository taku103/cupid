class Follow < ApplicationRecord
  belongs_to :user
  belongs_to :c_user
end
