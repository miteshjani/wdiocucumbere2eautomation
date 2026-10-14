Feature: Feature name

    Description: This is the demo feature file to test the cucumber framework with webdriverIO.

    @demo1
    Scenario: Navigate to the login screen
    Given the user launches the CURE web app
    When the user clicks on Make Appointment button
    Then the login page is displayed

    @demo @smoke
    Scenario Outline: Run First Demo Feature
    Given Google page is opened
    When Search with <SearchItem>
    Then Click on the first search result
    Then URL should match <ExpectedURL>

    Examples:
        | TestID | SearchItem | ExpectedURL |
        | DEMO_TC001  | WDIO  | https://webdriver.io  |