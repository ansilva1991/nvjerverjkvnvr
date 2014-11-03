class GameHistory < ActiveRecord::Base

  belongs_to :user
  has_one :map , dependent: :destroy
  has_many :survivors, dependent: :destroy

  def self.init current_user, survivor_params
    survivor = Survivor.create survivor_params

    game_history = GameHistory.new
    game_history.user = current_user
    game_history.survivors << survivor
    game_history.map = Map.new

    game_history.save
  end

  def has_survivor_in_zone? zone_code
    not self.survivors.where(zone_code: zone_code).empty?
  end

  def get_current_zone
    self.survivors.first.zone_code
  end

  def set_init_zone
    init_zone = map.zones.where(zone_type: 4)
    self.survivors.first.zone = init_zone

  end
end
