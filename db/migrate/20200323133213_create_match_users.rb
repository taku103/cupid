class CreateMatchUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :match_users do |t|
      t.references :user
      t.references :c_user
      t.timestamps
    end
  end
end
