# SDC205L - Mr. Zakaria
# SDC205 Project
# Week 4 - Programmatically Generating CSV Files

from datetime import datetime
import os


# Converts entered data based on the selected data type.
def convertData(value, data_type):
    if data_type == "1":
        # Fahrenheit to Celsius
        return (value - 32) * 5 / 9

    elif data_type == "2":
        # Pounds to kilograms
        return value / 2.205

    elif data_type == "3":
        # Inches to centimeters
        return value * 2.54


# Inserts data into the CSV file.
def insertData(file_path, data):
    try:
        # Opens the file with append permission.
        with open(file_path, "a") as file:
            file.write(data + "\n")

        return True

    except OSError as error:
        print("Error writing to file:", error)
        return False


# Displays the contents of the CSV file.
def viewData(file_path):
    try:
        # Opens the file with read-only permission.
        with open(file_path, "r") as file:
            print("\nThe file", os.path.abspath(file_path))

            for line in file:
                print(line.strip())

    except OSError as error:
        print("Error reading file:", error)


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

            elif data_type == "2":
                value = float(
                    input("Enter weight in pounds: ")
                )

            else:
                value = float(
                    input("Enter rain amount in inches: ")
                )

            # Calls convertData with the entered value and data type.
            converted_value = convertData(value, data_type)

            # Creates the comma-separated data for the CSV file.
            data = (
                date
                + ","
                + str(value)
                + ","
                + str(converted_value)
            )

            try:
                if insertData("ZooData.csv", data):
                    print(
                        "The following data was saved at",
                        datetime.now(),
                        ":",
                        data
                    )

            except OSError as error:
                print("Error saving data:", error)

    except ValueError:
        print("Error: Please enter a valid number.")


# Displays the spreadsheet automation menu.
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

    return input("Choose an option: ")


# Main program.
def main():
    while True:

        selection = displayMenu()

        if selection == "1":
            print(
                "You selected",
                selection,
                "at",
                datetime.now()
            )

            getInput()

        elif selection == "2":
            print(
                "You selected",
                selection,
                "at",
                datetime.now()
            )

            viewData("ZooData.csv")

        elif selection == "3":
            print(
                "You selected",
                selection,
                "at",
                datetime.now()
            )

            print("Generate Report selected.")

        elif selection == "4":
            print(
                "You selected",
                selection,
                "at",
                datetime.now()
            )

            print("Program ended.")
            break

        else:
            print("Error: Invalid choice selected.")


main()
