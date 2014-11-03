class PlayController < ApplicationController

  before_action :authenticate_user!, :has_game_history
  
  def index
    if (params[:zone_code] && current_user.game_history.has_survivor_in_zone?(params[:zone_code]))
      if Zone.valid_zone_code? params[:zone_code], current_user
        @zone = Zone.get_zone(params[:zone_code], current_user)
      else
        redirect_to home_index_path
      end
    else
      redirect_to "/play/#{current_user.game_history.get_current_zone}"
    end
  end

  def has_game_history
    unless current_user.game_history
      redirect_to my_survivor_path
    end
  end

end
