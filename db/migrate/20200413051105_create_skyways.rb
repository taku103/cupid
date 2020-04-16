class CreateSkyways < ActiveRecord::Migration[5.2]
  def change
    create_table :skyways do |t|
      t.string :code
      t.integer :user_c_user_id
      t.integer :bool
      t.timestamps
    end
  end
end
