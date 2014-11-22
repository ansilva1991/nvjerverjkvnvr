require 'RMagick'
include Magick

class Zone < ActiveRecord::Base

  belongs_to :map
  has_many :survivors

  before_create :set_template
  before_destroy :destroy_templates

  def set_template
    template = TemplateZone.new({ zone_type: self.zone_type })
    template.rotate_rnd
    template.save "users/#{map.game_history.user_id}/#{self.zone_code}.png"
    self.id = template.id

    info = template.generate_zone "users/#{map.game_history.user_id}/#{self.x}_#{self.y}"
  end

  def destroy_templates
    Dir["users/4/#{self.zone_code}*"].each do |f|
      FileUtils.rm_rf(f)
    end
  end

  def self.code_from_coordinate coords
    "#{coords.first}_#{coords.last}"
  end

  def self.decode zone_code
    c = zone_code.split('_')
    { x: c.first.to_i, y: c.last.to_i }
  end

  def static_mask
    f = Magick::ImageList.new("users/#{map.game_history.user_id}/#{zone_code}_mask.png").first
    g = Grid.new({ w: f.rows, h: f.columns, default: 0 })
    f.each_pixel do |pixel, c, r|
      g.set(r,c,1) if pixel.red == 0
    end
    g.grid
  end

   def floor_tiles
    f = Magick::ImageList.new("users/#{map.game_history.user_id}/#{zone_code}_floor_tiles.png").first
    g = Grid.new({ w: f.columns, h: f.rows })
    f.each_pixel do |pixel, c, r|
      g.set(c,r,pixel.red)
    end
    g.grid
  end

  def to_json_load
    {
      floor_tiles: floor_tiles,
      static_mask: static_mask,
      zone_code: zone_code
    }
  end
end
