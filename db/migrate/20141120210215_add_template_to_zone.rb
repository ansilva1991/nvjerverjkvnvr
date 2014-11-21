class AddTemplateToZone < ActiveRecord::Migration
  def up
    add_column :zones, :template, :integer
  end
  def down
    remove_column :zones, :template
  end
end
