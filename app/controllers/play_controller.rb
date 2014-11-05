class PlayController < ApplicationController

  before_action :authenticate_user!, :has_game_history
  
  def index
    @zone_code = current_user.game_history.get_current_zone_code
  end

  def get_zone
    current_user.map.update_template
    zone = current_user.map.get_zone_by_zone_code params[:zone_code]
    render :json => current_user
  end

  def has_game_history
    unless current_user.game_history
      redirect_to my_survivor_path
    end
  end

end
