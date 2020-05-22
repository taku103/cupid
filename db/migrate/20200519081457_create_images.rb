class CreateImages < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      # imageカラムはイメージアップローダーで使われているのでこっちに書いても向こうのが認識される
      # imageカラムをこの名前として代用
      t.string :src
      t.integer :user_id
      # bool == 0,1でuserのmain, sub, 2,3でc_userのmain, subの写真
      t.string :bool
      t.timestamps
    end
  end
end
