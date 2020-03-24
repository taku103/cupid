class CreateGroupCUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :group_c_users do |t|

      t.timestamps
    end
  end
end
