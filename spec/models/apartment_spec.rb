require 'rails_helper'

RSpec.describe Apartment, type: :model do
  it 'can be instantiated' do
    expect{Apartment.new}.to_not raise_error
  end

  it "can be filled in with diffrent variables and be saved" do
    apartment = Apartment.new(street_1: '4279 Everts', street_2: '11823 Josse', city:'San Diego', zip:'92109', state:'CA', country:'USA', name:'J Fisher', phone_number:'123-902-4389', contact_hours:'9 to 9')
    expect(apartment.save).to eq true

    new_apartment = Apartment.find_by(street_1:'4279 Everts')
    expect(new_apartment.city).to eq 'San Diego'
    expect(new_apartment.zip).to eq '92109'
    expect(new_apartment.state).to eq 'CA'
  end


    end
