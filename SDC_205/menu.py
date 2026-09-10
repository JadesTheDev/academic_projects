# SDC205L - Mr. Zakaria
# Jade Powell
# September 10th, 2026

from datetime import datetime

while True:
    print("\nJadPow5144 Spreadsheet Automation Menu")
    print("1. Input Data")
    print("2. View Current Data")
    print("3. Generate Report")
    print("4. Exit")

    # The next line retrieves the inputted option and stores into the variable called selectedOption.
    selectedOption = input("Enter your option number: ")

    if selectedOption == "4":
        print("You selected option number", selectedOption)
        print("The time and date is", str(datetime.now()))
        print("Exiting application.")
        break

    elif selectedOption in ["1", "2", "3"]:
        print("You selected option number", selectedOption)
        print("The time and date is", str(datetime.now()))

    else:
        print("Invalid option. Please select 1, 2, 3, or 4.")