class Survivor < ActiveRecord::Base

  belongs_to :game_history
  belongs_to :zone, foreign_key: :zone_code, primary_key: :zone_code
  
end
