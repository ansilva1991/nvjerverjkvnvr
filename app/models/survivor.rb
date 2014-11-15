class Survivor < ActiveRecord::Base

  belongs_to :game_history
  belongs_to :zone, foreign_key: :zone_code, primary_key: :zone_code

  def to_json_load
    {
      x: x || 0,
      y: y || 0
    }
  end
end
