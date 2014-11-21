class TemplateZone < Template

  TILE_KINDS = {
    init_zone: {
      _65535_65535_65535: :street,
      _0_65535_0: :sidewalk,
      _0_23130_65535: :street,
      _65535_65535_0: :building
    }
  }

  def initialize options = {}
    t = nil

    if options[:file]
      t = options[:file]
    else
      t = Dir["#{PATH}/zone/#{options[:zone_type]}/*"].sample
    end

    self.src = t
    self.id = t.split('/').last.tr('.png','').to_i
    self.zone_type = options[:zone_type]
    self.file = Magick::ImageList.new(t).first
  end

  def generate_zone path
    info_tiles = YAML.load_file("files/info_zones/#{self.zone_type}.yml")

    grid = Grid.new({ w: self.file.columns, h: self.file.rows })

    self.file.each_pixel do |pixel, c, r|
      type = TILE_KINDS[self.zone_type][Template.pixel_code(pixel).to_sym]
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
    #create floor_tiles
    f = Image.new(self.file.columns,self.file.rows) { self.background_color = "black" }
    tiles.all_points.each do |point|
      f.pixel_color( point[:x],
                     point[:y],
                     Template.int_to_pixel(point[:value].to_i) )
      end
    f.write "#{path}_floor_tiles.png"

    #create static mask
    f = Image.new(self.file.columns * 3,self.file.rows * 3) { self.background_color = "white" }
    f.write "#{path}_mask.png"
  end
end