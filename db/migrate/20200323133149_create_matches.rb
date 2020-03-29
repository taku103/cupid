class CreateMatches < ActiveRecord::Migration[5.2]
  def change
    create_table :matches do |t|
      t.references :c_user
      t.integer :step
      t.timestamps
    end
  end
end
