class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.text :content
      t.string :image
      t.references :user
      t.integer :match_c_user_id
      t.integer :bool
      t.timestamps
    end
  end
end
