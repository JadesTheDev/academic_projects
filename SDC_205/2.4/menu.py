# SDC205L - Mr. Zakaria
# Jade Powell
# September 10th, 2026

from datetime import datetime

studentId = "JadPow5144"

menuOptions = [
    "1 Input Data",
    "2 View Current Data",
    "3 Generate Report",
    "4 Exit"
]

while True:
    print("\n" + studentId + " Spreadsheet Automation Menu")
    print("Choose a number from the following options")

    # option represents each menu choice stored in the menuOptions list.
    for option in menuOptions:
        print(option)

    selectedOption = input("Enter your option number: ")

    if selectedOption in ["1", "2", "3"]:
        print("You selected", selectedOption, "at", datetime.now())

    elif selectedOption == "4":
        print("You selected", selectedOption, "at", datetime.now())
        print("Exiting application.")
        break

    else:
        print("Error: invalid choice selected.")
