class Map < ActiveRecord::Base

  belongs_to :game_history
  has_many :zones , dependent: :destroy

  before_create :set_template

  def set_template
    template = Template.new({ :random => true, :type => Template::TYPE_WORLD })
    self.template = template.id

    Dir.mkdir("users/#{game_history.user_id}")

    template.rotate_rnd
    template.save "users/#{game_history.user_id}/world.png"

    game_history.survivors.first.zone_code = template.get_init_zone_code
    game_history.survivors.first.save
  end

  def update_template
    current_template = Template.new({:file => "templates/world/#{self.template}.png"})
    self_template = Template.new({:file => "users/#{game_history.user_id}/world.png"})
    self_template.correct_angle

    if current_template.b64 != self_template.b64
      #in progress
    end
  end

  def get_zone_by_zone_code zone_code
    template = Template.new({:file => "users/#{game_history.user_id}/world.png"})
    zone = Zone.where(:zone_code => zone_code).first
    unless zone
      zone_coords = Zone.decode zone_code
      zone_type = template.get_zone_type zone_coords

      zone = Zone.new({
        :zone_code => zone_code,
        :zone_type => zone_type,
        :x => zone_coords[:x],
        :y => zone_coords[:y]
        })

      zones << zone
    end

    zone
  end

  def distanceTo o,d
    Math.sqrt(((d[0] - o[0]) ** 2) + ((d[1] - o[1]) ** 2));
  end

end
