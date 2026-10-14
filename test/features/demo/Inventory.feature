Feature: Inventory 

  

     @demo1 @smoke
    Scenario Outline: Demo Inventory
    Given Login to inventorty web app
    Then Inventory page should list <NumberOfProducts>
    Then validate all products have valid price
  

    Examples:
      | TestID|NumberOfProducts|
      |WEB_TC002|6|
