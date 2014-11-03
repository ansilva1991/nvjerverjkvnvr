class CreateSurvivors < ActiveRecord::Migration
  def up
    create_table :survivors do |t|
      t.string :name
      t.string :last_name
      t.string :sex
      t.integer :skin
      t.integer :hair
      t.integer :x
      t.integer :y
      t.string :zone_code
      t.integer :game_history_id

      t.timestamps
    end

    add_index :survivors, :game_history_id
    
  end
  def down
    drop_table :survivors
  end
end
