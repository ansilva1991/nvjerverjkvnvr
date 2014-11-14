class Grid

  attr_accessor :grid,:width,:height

  def initialize options
    self.grid = Array.new(options[:w].to_i){ Array.new(options[:h].to_i){ options[:default] } }
    self.width = options[:w].to_i
    self.height = options[:h].to_i
  end

  def set x,y,value
    return nil if((x < 0) or (y < 0) or (x > self.width - 1) or (y > self.height - 1))
    self.grid[x][y] = value
  end

  def get x,y
    return nil if((x < 0) or (y < 0) or (x > self.width - 1) or (y > self.height - 1))
    self.grid[x][y]
  end

  def around_exp x,y
    exp = ""
    exp += self.get(x,y) == self.get(x-1,y-1) ? "#" : "@"
    exp += self.get(x,y) == self.get(x,y-1) ? "#" : "@"
    exp += self.get(x,y) == self.get(x+1,y-1) ? "#" : "@"
    exp += self.get(x,y) == self.get(x-1,y) ? "#" : "@"
    exp += self.get(x,y) == self.get(x+1,y) ? "#" : "@"
    exp += self.get(x,y) == self.get(x-1,y+1) ? "#" : "@"
    exp += self.get(x,y) == self.get(x,y+1) ? "#" : "@"
    exp += self.get(x,y) == self.get(x+1,y+1) ? "#" : "@"
    exp
  end

  def all_points
    resp = []
    self.grid.each_with_index do |rows,x|
      rows.each_with_index do |value,y|
        resp << { x: x ,y: y,value: value }
      end
    end
    resp
  end
end