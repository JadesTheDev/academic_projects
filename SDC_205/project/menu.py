# SDC205L - Mr. Zakaria
# JadPow5144
# September 17, 2026
# SDC205L 3.4 Project
from datetime import datetime
# Converts Fahrenheit to Celsius.
def convertData(fahrenheit):
    return (fahrenheit - 32) * 5 / 9
# Gets multiple dated weather entries from the user.
def getInput():
    entries = []

    try:
        number_of_entries = int(input("How many entries would you like to add? "))

        for entry_number in range(number_of_entries):
            print("\nEntry", entry_number + 1, "of", number_of_entries)

            date = input("Enter a date: ")
            fahrenheit = float(input("Enter the highest temperature for the inputted date: "))

            celsius = convertData(fahrenheit)
            entries.append((date, fahrenheit, celsius))

            print(
                "The following data was entered at",
                datetime.now(),
                ":",
                date,
                fahrenheit,
                round(celsius, 2)
            )

    except ValueError:
        print("Error: Please enter a valid number.")

    return entries


# Displays the spreadsheet automation menu and returns the user's selection.
def displayMenu():
    menu_options = [
        "Input Data",
        "View Current Data",
        "Generate Report"
    ]

    print("\nJadPow5144's Spreadsheet Automation Menu")
    print("Choose a number from the following options")

    for number, option in enumerate(menu_options, start=1):
        print(number, option)

    selection = input("Choose an option: ")
    return selection
# Main program loop.
def main():
    while True:
        selection = displayMenu()

        if selection in ("1", "2", "3"):
            print("You selected", selection, "at", datetime.now())

            if selection == "1":
                getInput()
            elif selection == "2":
                print("View Current Data selected.")
            elif selection == "3":
                print("Generate Report selected.")
        else:
            print("Error: Invalid choice selected.")

        again = input("\nWould you like to return to the menu? (y/n): ").lower()
        if again != "y":
            break

main()
