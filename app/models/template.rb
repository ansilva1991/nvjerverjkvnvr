require 'RMagick'
include Magick

class Template

  PATH = "files/templates"

  POINT_ANGLE = "_65535_65535_65535"

  attr_accessor :src, :id, :file, :zone_type

  def rotate_rnd
    self.file = file.rotate([0,90,180,270].sample)
  end

  def save path
    self.file.write path
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

  def self.int_to_pixel int
    rgb = {}
    %w(r g b).inject(int) {|a,i| rest, rgb[i] = a.divmod 256; rest}
    rgb = rgb.collect{|i,j| j * 257 }

    Pixel.new(rgb[0],rgb[1],rgb[2],0)
  end

  def b64
    File.open(self.src, 'r') do|image_file|
      return Base64.encode64(image_file.read)
    end
  end

end
