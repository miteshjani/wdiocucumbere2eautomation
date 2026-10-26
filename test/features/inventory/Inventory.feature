Feature: Inventory 

  

     @demo1 @smoke @debug
    Scenario Outline:<TestID>: Demo Inventory
    # Given Login to inventorty web app
    Given As a standard user I login to inventory webapp
          | USerType | Username|
          |StdUser|standard_user|
          |ProbUser|problem_user|
          |PerfUser|perfomance_glitch_user|
#     Then Inventory page should not list <NumberOfProducts>
#     Then validate all products have valid price
  

    Examples:
      | TestID|NumberOfProducts|
      |WEB_TC002|6|
