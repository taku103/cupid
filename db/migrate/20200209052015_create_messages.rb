class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.text :content
      t.string :image
      t.references :user
      t.references :c_user

      t.timestamps
    end
  end
end
