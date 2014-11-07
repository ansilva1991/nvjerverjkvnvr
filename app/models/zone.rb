class Zone < ActiveRecord::Base

  belongs_to :map
  has_many :survivors

  serialize :floor_tiles

  before_create :set_template

  def set_template
    #in progress
  end

  def self.code_from_coordinate coords
    "#{coords.first}:#{coords.last}"
  end

  def self.decode zone_code
    c = zone_code.split(':')
    { :x => c.first.to_i, :y => c.last.to_i }
  end

end
