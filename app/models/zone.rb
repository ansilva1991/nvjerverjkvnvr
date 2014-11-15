class Zone < ActiveRecord::Base

  belongs_to :map
  has_many :survivors

  serialize :floor_tiles

  before_create :set_template

  def set_template
    template = Template.new({
      type: Template::TYPE_ZONE,
      zone_type: self.zone_type })
    template.rotate_rnd
    template.save "users/#{map.game_history.user_id}/#{self.x}_#{self.y}.png"

    info = template.get_grid_zone
    self.floor_tiles = info.grid
  end

  def self.code_from_coordinate coords
    "#{coords.first}:#{coords.last}"
  end

  def self.decode zone_code
    c = zone_code.split(':')
    { x: c.first.to_i, y: c.last.to_i }
  end

  def to_json_load
    {
      floor_tiles: floor_tiles
    }
  end
end
