require 'RMagick'
include Magick

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

    info = template.generate_zone "users/#{map.game_history.user_id}/#{self.x}_#{self.y}"
    self.floor_tiles = info[:tiles]
  end

  def self.code_from_coordinate coords
    "#{coords.first}:#{coords.last}"
  end

  def self.decode zone_code
    c = zone_code.split(':')
    { x: c.first.to_i, y: c.last.to_i }
  end

  def static_mask
    i = Template.new({ :file => "users/#{map.game_history.user_id}/#{self.x}_#{self.y}_mask.png"})
    mask = Grid.new({ w: i.file.columns, h: i.file.rows, default:  0 })
    i.file.each_pixel do |pixel,c,r|
      mask.set(c,r,1) if pixel.to_color == "black"
    end
    mask.invert
  end

  def to_json_load
    {
      floor_tiles: floor_tiles,
      static_mask: static_mask
    }
  end
end
