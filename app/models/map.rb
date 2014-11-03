class Map < ActiveRecord::Base

  belongs_to :game_history
  has_many :zones , dependent: :destroy

  serialize :grid

  before_create :generate_zones

  def generate_zones
    islands = []
    max_size_island = Random.rand(11) + 4
    min_size_island = 4

    grid = Array.new(40) { Array.new(50) }

    for h in 0..20
      type_island = Random.rand(3) + 1;

      if islands.last
        while type_island == islands.last[:type] 
          type_island = Random.rand(3) + 1;
        end
      end

      width = Random.rand((grid.first.size - 2)) + 1 
      height = Random.rand((grid.size - 2)) + 1 

      width = max_size_island if width > max_size_island
      width = min_size_island if width < min_size_island

      height = max_size_island if height > max_size_island
      height = min_size_island if height < min_size_island

      point_init = [Random.rand(grid.first.size - width) + 1,Random.rand(grid.size - height) + 1]

      x_center = (point_init.first + width * 0.5).floor;
      y_center = (point_init.last + height * 0.5).floor;
      max_distance = distanceTo point_init, [x_center,y_center]

      for i in point_init.last..point_init.last + height
        for j in point_init.first..point_init.first + width
          next if(i > grid.size - 2 || (j > grid.first.size - 2))

          distance = distanceTo [x_center,y_center], [j,i]
          porc = 100 - distance * 100 / max_distance
          p = Random.rand(100) - 25;

          if(p <= porc)
            t = Random.rand(100);
            grid[i][j] = (t <= porc) ? type_island : 1;
            next
          end
        end
      end
      islands << {
        x: point_init.first,
        y: point_init.last,
        w: width,
        h: height,
        x_center: x_center,
        y_center: y_center,
        type: type_island
      }
    end

    init_island = islands.sample
    init_point = {
      island: init_island,
      x: init_island[:x_center],
      y: init_island[:y_center]
    }
    grid[init_point[:y]][init_point[:x]] = 4

    dist = -1
    end_island = islands.last

    islands.each do |i|
      tmp_dist = distanceTo [init_island[:x_center],init_island[:y_center]],[i[:x_center],i[:y_center]]
      if dist < tmp_dist
        dist = tmp_dist
        end_island = i 
      end
    end

    end_point = {
      island: end_island,
      x: end_island[:x_center],
      y: end_island[:y_center]
    }
    grid[end_point[:y]][end_point[:x]] = 5

    self.grid = grid

    self.zones << Zone.create({ zone_type: 4, x: init_point[:x], y: init_point[:y] })

    self.game_history.survivors.first.zone = self.zones.first

  end

  def distanceTo o,d
    Math.sqrt(((d[0] - o[0]) ** 2) + ((d[1] - o[1]) ** 2));
  end

end
