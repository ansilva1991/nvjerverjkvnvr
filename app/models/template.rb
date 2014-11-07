require 'RMagick'
class Template

  PATH = "templates"
  TYPE_WORLD = "world"

  POINT_ANGLE = "65535:65535:65535"
  WORLD = {
    :init_zone => "0:0:65535",
    :water_zone => "0:0:0"
  }
  

  attr_accessor :src, :id, :file, :type

  def initialize options
    t = options[:random] ? Dir["#{PATH}/#{options[:type]}/*"].sample : options[:file]
    self.src = t
    self.id = t.tr("#{PATH}/#{options[:type]}.png","").to_i
    self.type = options[:type]
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

  def correct_angle
    angle = 0
    angle = 90 if Template.pixel_code(self.file.pixel_color(self.file.columns,0)) == POINT_ANGLE
    angle = 180 if Template.pixel_code(self.file.pixel_color(self.file.columns,self.file.rows)) == POINT_ANGLE
    angle = 270 if Template.pixel_code(self.file.pixel_color(0,self.file.rows)) == POINT_ANGLE

    self.file = file.rotate(angle)
  end

  def self.pixel_code pixel
    "#{pixel.red}:#{pixel.blue}:#{pixel.green}"
  end

  def b64
    File.open(self.src, 'r') do|image_file| 
      return Base64.encode64(image_file.read) 
    end
  end

end
