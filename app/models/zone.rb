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
    File.open("users/#{map.game_history.user_id}/#{zone_code}_mask.png", 'r') do|image_file|
      return Base64.encode64(image_file.read)
    end
  end

   def floor_tiles
    File.open("users/#{map.game_history.user_id}/#{zone_code}_floor_tiles.png", 'r') do|image_file|
      return Base64.encode64(image_file.read)
    end
  end

  def to_json_load
    {
      floor_tiles: floor_tiles,
      static_mask: static_mask
    }
  end
end
