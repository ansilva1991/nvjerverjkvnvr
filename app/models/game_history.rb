class GameHistory < ActiveRecord::Base

  belongs_to :user
  has_one :map , dependent: :destroy
  has_many :survivors, dependent: :destroy

  before_destroy :destroy_files

  def self.init current_user, survivor_params
    survivor = Survivor.create survivor_params

    game_history = GameHistory.new
    game_history.user = current_user
    game_history.survivors << survivor
    game_history.map = Map.new

    game_history.save
  end

  def get_last_info
    {
      zone: map.get_zone_by_zone_code( survivors.first.zone.zone_code ).to_json_load,
      survivors: survivors.collect(&:to_json_load)
    }
  end

  def has_survivor_in_zone? zone_code
    not self.survivors.where(zone_code: zone_code).empty?
  end

  def get_current_zone_code
    self.survivors.first.zone_code
  end

  def destroy_files
    FileUtils.rm_rf("users/#{self.user_id}")
  end
end
