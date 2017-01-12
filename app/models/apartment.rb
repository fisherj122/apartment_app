class Apartment < ApplicationRecord
  def full_street_address
    street_1.to_s + ", " + street_2.to_s + ", " + city.to_s + ", " + zip.to_s + ", " + state.to_s + ", " + country.to_s
  end
  geocoded_by :full_street_address
  after_validation :geocode
  belongs_to :user
end
