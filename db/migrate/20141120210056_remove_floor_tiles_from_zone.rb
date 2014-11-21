class RemoveFloorTilesFromZone < ActiveRecord::Migration
  def up
    remove_column :zones, :floor_tiles
  end
  def down
    add_column :zones, :floor_tiles, :text
  end
end
