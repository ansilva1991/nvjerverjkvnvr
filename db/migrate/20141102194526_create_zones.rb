class CreateZones < ActiveRecord::Migration
  def up
    create_table :zones do |t|
      t.integer :map_id
      t.string :zone_code
      t.string :zone_type
      t.integer :x
      t.integer :y
      t.text :floor_tiles

      t.timestamps
    end

    add_index :zones,:map_id

  end
  def down
    drop_table :zones
  end
end
