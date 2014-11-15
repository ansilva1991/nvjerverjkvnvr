require 'RMagick'
class Template

  PATH = "files/templates"
  TYPE_WORLD = "world"
  TYPE_ZONE = "zone"

  POINT_ANGLE = "_65535_65535_65535"
  WORLD = {
    init_zone: "_0_0_65535",
    water_zone: "_0_0_0"
  }
  ZONE = {
    init_zone: {
      _65535_65535_65535: :street,
      _0_65535_0: :sidewalk,
      _0_23130_65535: :street,
      _65535_65535_0: :building
    }
  }


  attr_accessor :src, :id, :file, :type, :zone_type

  def initialize options
    t = nil

    if options[:file]
      t = options[:file]
    else
      case options[:type]
        when TYPE_WORLD
          t = Dir["#{PATH}/world/*"].sample
        when TYPE_ZONE
          t = Dir["#{PATH}/zone/#{options[:zone_type]}/*"].sample
      end
    end

    self.src = t
    self.id = t.split('/').last.tr('.png','').to_i
    self.type = options[:type]
    self.zone_type = options[:zone_type]
    self.file = Magick::ImageList.new(t).first
  end

  def rotate_rnd
    self.file = file.rotate([0,90,180,270].sample)
  end

  def save path
    self.file.write path
  end

  def get_init_zone_code
    self.file.each_pixel do |pixel, c, r|
      return Zone.code_from_coordinate([c,r]) if WORLD[:init_zone] == Template.pixel_code(pixel)
    end
    nil
  end

  def get_zone_type coords
    point = Template.pixel_code self.file.pixel_color(coords[:x],coords[:y])
    WORLD.each do |key,value|
      return key if value == point
    end
    raise "undefined zone_type (#{point})"
  end

  def get_grid_zone
    info_tiles = YAML.load_file("files/info_zones/#{self.zone_type}.yaml")

    grid = Grid.new({ w: self.file.columns, h: self.file.rows })

    self.file.each_pixel do |pixel, c, r|
      type = ZONE[self.zone_type][Template.pixel_code(pixel).to_sym]
      raise "undefined tile_type (#{Template.pixel_code(pixel)} in #{c}/#{r})" unless type
      grid.set c,r,type.to_s
    end

    tiles = Grid.new({ w: self.file.columns, h: self.file.rows })

    grid.all_points.each do |point|
      around = grid.around_exp point[:x], point[:y]
      value = info_tiles[point[:value]]['default']
      info_tiles[point[:value]].keys.each do |key|
        value = info_tiles[point[:value]][key] if /#{key}/.match(around)
      end
      tiles.set(point[:x],point[:y],value)
    end

    tiles
  end

  def correct_angle
    angle = 0
    angle = 90 if Template.pixel_code(self.file.pixel_color(self.file.columns,0)) == POINT_ANGLE
    angle = 180 if Template.pixel_code(self.file.pixel_color(self.file.columns,self.file.rows)) == POINT_ANGLE
    angle = 270 if Template.pixel_code(self.file.pixel_color(0,self.file.rows)) == POINT_ANGLE

    self.file = file.rotate(angle)
  end

  def self.pixel_code pixel
    "_#{pixel.red}_#{pixel.blue}_#{pixel.green}"
  end

  def b64
    File.open(self.src, 'r') do|image_file|
      return Base64.encode64(image_file.read)
    end
  end

end
