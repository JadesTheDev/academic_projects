# SDC205 - Mr. Zakaria
# Jade Powell
# September 17, 2026

def functionOne():
    print("My Student ID is JadPow5144")


def functionTwo():
    num1 = int(input("Please enter a number: "))
    num2 = int(input("Please enter a number: "))
    total = num1 + num2
    print(f"The sum of {num1} and {num2} is {total}.")
    return total


def functionThree(total):
    if total > 5:
        print("The sum is greater than 5.")
    else:
        print("The sum is 5 or less.")

    return 5144


def main():
    # Call functionOne() to display the student ID.
    functionOne()

    # Call functionTwo() and save the returned sum.
    sumValue = functionTwo()

    # Pass the saved sum to functionThree() and save its returned value.
    studentIdNumber = functionThree(sumValue)

    # Display the numeric Student ID returned by functionThree().
    print(f"functionThree returned the value of {studentIdNumber}.")


main()
