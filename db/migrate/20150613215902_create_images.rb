class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :public_id, null: false
      t.string :format, null: false
      t.integer :owner_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
