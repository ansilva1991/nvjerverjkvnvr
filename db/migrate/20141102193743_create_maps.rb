class CreateMaps < ActiveRecord::Migration
  def up
    create_table :maps do |t|
      t.integer :game_history_id
      t.text :grid
      t.timestamps
    end

    add_index :maps, :game_history_id

  end
  def down
    drop_table :maps
  end
end
