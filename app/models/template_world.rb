class TemplateWorld < Template

  ZONE_KINDS = {
    init_zone: "_0_0_65535",
    water_zone: "_0_0_0"
  }

  def initialize options = {}
    t = nil
    if options[:file]
      t = options[:file]
    else
      t = Dir["#{PATH}/world/*"].sample
    end

    self.src = t
    self.id = t.split('/').last.tr('.png','').to_i
    self.file = Magick::ImageList.new(t).first
  end

  def get_init_zone_code
    self.file.each_pixel do |pixel, c, r|
      return Zone.code_from_coordinate([c,r]) if ZONE_KINDS[:init_zone] == Template.pixel_code(pixel)
    end
    nil
  end

  def get_zone_type coords
    point = Template.pixel_code self.file.pixel_color(coords[:x],coords[:y])
    ZONE_KINDS.each do |key,value|
      return key if value == point
    end
    raise "undefined zone_type (#{point} - #{coords[:x]}/#{coords[:y]})"
  end
end