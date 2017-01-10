require 'rails_helper'

RSpec.feature "AddApartments", type: :feature do
context "Add an apartment" do
  Steps "for adding an address to an apartment" do
    Given "that I am on the landing page" do
      visit '/'
    end
    Then 'I can click new apartment'do
      click_link('New Apartment')
      expect(page).to have_content "New Apartment"
    end
    Then 'I can fill in the address form' do
      fill_in 'apartment[street_1]', with: '4279 Everts'
      fill_in 'apartment[street_2]', with: '123 main'
      fill_in 'apartment[city]', with: 'San Diego'
      fill_in 'apartment[zip]', with: '92109'
      fill_in 'apartment[state]', with: 'CA'
      fill_in 'apartment[country]', with: 'USA'
      fill_in 'apartment[name]', with: 'Phill Smith'
      fill_in 'apartment[phone_number]', with: '(314)-803-4745'
      fill_in 'apartment[contact_hours]', with: '8 to 5'
        click_button 'Create Apartment'
    end
    And 'Then I expect to be taken to a page with apartment information' do
      expect(page).to have_content "Apartment was successfully created"
    end
  end
end
end
