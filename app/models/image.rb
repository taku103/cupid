class Image < ApplicationRecord
  mount_uploader :image, ImageUploader

  def self.new_multiple_image(image_params)
    # imageが空の時にfalseを返す
    return false if image_params[:image].nil?
    # エラった時rollbackさせるTransactionの中にかく
    Image.transaction do
      image_params[:image].each do |image|
        image = Image.new(image: image, user_id: image_params[:user_id], bool: 1)
        if image.save!
        else
          return false
        end
      end
    end
    return true
  end
  
end
