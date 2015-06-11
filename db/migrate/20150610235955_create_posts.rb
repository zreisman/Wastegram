class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :body
      t.string :image_url, null: false
      t.integer :author_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
