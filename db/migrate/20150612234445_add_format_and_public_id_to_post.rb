class AddFormatAndPublicIdToPost < ActiveRecord::Migration
  def change
    add_column :posts, :format, :string
    add_column :posts, :public_id, :string
  end
end
