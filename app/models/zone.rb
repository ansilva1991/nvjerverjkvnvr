class Zone < ActiveRecord::Base

  belongs_to :map
  has_many :survivors

  serialize :floor_tiles

  before_create :set_zone_code, :generate_zone

  def self.get_zone zone_code, current_user
    zone = Zone.where(zone_code: zone_code).first rescue nil
    unless zone
      info_code = Zone.decode_code zone_code
      zone = Zone.new
      zone.map = current_user.game_history.map
      zone.x = info_code[:x]
      zone.y = info_code[:y]
      zone.zone_type = current_user.game_history.map.grid[zone.y][zone.x]

      zone.save
    end

    zone
  end

  def self.decode_code zone_code
    code = zone_code.split('_')
    { x: code[0].to_i , y: code[1].to_i }
  end

  def self.valid_zone_code? zone_code, current_user
    info_code = Zone.decode_code zone_code

    map_width = (current_user.game_history.map.grid.first.size - 1)
    map_height = (current_user.game_history.map.grid.size - 1)

    if((map_width > info_code[:x])&&(map_height > info_code[:y])&&(-1 < info_code[:x])&&(-1 < info_code[:x]))
      return true
    end
    return false
  end

  def set_zone_code
    self.zone_code = "#{self.x}_#{self.y}"
  end

  def generate_zone
    self.floor_tiles = Array.new(10000){ 0 }
  end
end
