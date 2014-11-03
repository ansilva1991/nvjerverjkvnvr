class SurvivorsController < ApplicationController

  before_action :has_game_history

  def new
    @survivor = Survivor.new
  end

  def create
    @game_history = GameHistory.init current_user, survivor_params

    redirect_to play_path
  end

  def survivor_params
     params.require(:survivor).permit( :name, :last_name, :sex, :skin )
  end

  def has_game_history
    if current_user.game_history
      redirect_to play_path
    end
  end
end
