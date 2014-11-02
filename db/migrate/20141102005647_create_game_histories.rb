class CreateGameHistories < ActiveRecord::Migration
  def up
    create_table :game_histories do |t|
      t.integer :user_id
      t.integer :main_survivor_id

      t.timestamps
    end

    add_index :game_histories, :user_id

  end
  def down
    drop_table :game_histories
  end
end
