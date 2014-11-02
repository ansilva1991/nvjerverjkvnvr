class PlayController < ApplicationController

  before_action :authenticate_user!, :set_locale, :has_game_history
  
  def index

  end
 
  def has_game_history
    unless current_user.game_history
      redirect_to my_survivor_path
    end
  end

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end
end
