class PlayController < ApplicationController

  before_action :authenticate_user!, :has_game_history

  def index
  end

  def get_last_info
    current_user.map.update_template
    info = current_user.game_history.get_last_info
    render json: info
  end

  def has_game_history
    unless current_user.game_history
      redirect_to my_survivor_path
    end
  end

end
