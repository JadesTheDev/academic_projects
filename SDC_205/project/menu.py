# SDC205L - Mr. Zakaria
# JadPow5144
# September 17, 2026
# SDC205L 3.4 Project

from datetime import datetime


# Converts the entered value based on the selected data type.
def convertData(value, data_type):
    if data_type == "1":
        return (value - 32) * 5 / 9

    elif data_type == "2":
        return value / 2.205

    elif data_type == "3":
        return value * 2.54


# Gets multiple dated entries from the user.
def getInput():
    try:
        number_of_entries = int(
            input("How many entries would you like to add? ")
        )

        for entry_number in range(number_of_entries):

            print(
                "\nEntry",
                entry_number + 1,
                "of",
                number_of_entries
            )

            print("1 Temperature")
            print("2 Weight")
            print("3 Rain Amount")

            data_type = input("Choose the type of data: ")

            if data_type not in ("1", "2", "3"):
                print("Error: Invalid data type selected.")
                continue

            date = input("Enter a date: ")

            if data_type == "1":
                value = float(
                    input("Enter temperature in Fahrenheit: ")
                )
                converted_value = convertData(value, data_type)

                print(
                    "The following data was entered at",
                    datetime.now(),
                    ":",
                    date,
                    value,
                    "Fahrenheit =",
                    round(converted_value, 2),
                    "Celsius"
                )

            elif data_type == "2":
                value = float(
                    input("Enter weight in pounds: ")
                )
                converted_value = convertData(value, data_type)

                print(
                    "The following data was entered at",
                    datetime.now(),
                    ":",
                    date,
                    value,
                    "pounds =",
                    round(converted_value, 2),
                    "kilograms"
                )

            elif data_type == "3":
                value = float(
                    input("Enter rain amount in inches: ")
                )
                converted_value = convertData(value, data_type)

                print(
                    "The following data was entered at",
                    datetime.now(),
                    ":",
                    date,
                    value,
                    "inches =",
                    round(converted_value, 2),
                    "centimeters"
                )

    except ValueError:
        print("Error: Please enter a valid number.")


# Displays the spreadsheet automation menu and returns the user's selection.
def displayMenu():
    menu_options = [
        "Input Data",
        "View Current Data",
        "Generate Report",
        "Exit Program"
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

        if selection in ("1", "2", "3", "4"):
            print(
                "You selected",
                selection,
                "at",
                datetime.now()
            )

            if selection == "1":
                getInput()

            elif selection == "2":
                print("View Current Data selected.")

            elif selection == "3":
                print("Generate Report selected.")

            elif selection == "4":
                print("Program ended.")
                break

        else:
            print("Error: Invalid choice selected.")


main()
