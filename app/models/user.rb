class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :game_history , dependent: :destroy

  def map
    self.game_history.map rescue nil
  end
end
