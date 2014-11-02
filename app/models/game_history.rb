class GameHistory < ActiveRecord::Base

  belongs_to :user
  has_one :main_survivor, class_name: "Survivor", foreign_key: :id, primary_key: :main_survivor_id
  has_many :survivors

end
