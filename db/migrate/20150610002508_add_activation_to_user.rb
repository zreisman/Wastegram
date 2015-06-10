class AddActivationToUser < ActiveRecord::Migration
  def change
    add_column :users, :activated, :boolean
    add_column :users, :activation_token, :string, index: true
  end
end
