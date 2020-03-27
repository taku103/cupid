class CreateMatches < ActiveRecord::Migration[5.2]
  def change
    create_table :matches do |t|
      t.string :name
      t.references :user
      t.references :c_user
      t.timestamps
    end
  end
end
