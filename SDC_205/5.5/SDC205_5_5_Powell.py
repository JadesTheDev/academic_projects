# SDC205 - Week 5, Assignment 5.5
# Final Performance Assessment
# September 30, 2026
# Run from IDLE. Keep final.csv beside this script.

from pathlib import Path
from datetime import datetime
import csv
import matplotlib.pyplot as plt
from openpyxl import Workbook
from openpyxl.chart import PieChart, Reference

STUDENT_ID = "JadPow5144"
TODAY = datetime.now().strftime("%B %d, %Y").replace(" 0", " ")
BASE_DIR = Path(__file__).resolve().parent
CSV_FILE = BASE_DIR / "final.csv"
XLSX_FILE = BASE_DIR / "final.xlsx"

def askUser():
    total = 0
    # This loop asks for five numbers and adds each one to a running total.
    for i in range(5):
        number = float(input(f"Please enter number {i + 1}: "))
        total += number
    print(f"The sum of the 5 numbers entered is: {total:g}")

def askIncome():
    # This loop asks for five names and incomes and appends each record to final.csv.
    with open(CSV_FILE, "a", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        for i in range(5):
            name = input(f"Please enter name {i + 1}: ")
            income = int(input(f"Please enter {name}'s annual income: "))
            writer.writerow([name, income])

def readIncomeData():
    names, incomes = [], []
    with open(CSV_FILE, "r", newline="", encoding="utf-8-sig") as file:
        for row in csv.reader(file):
            if len(row) < 2:
                continue
            try:
                income = int(float(row[1].strip().replace(",", "").replace("$", "")))
            except ValueError:
                continue
            names.append(row[0].strip())
            incomes.append(income)
    return names, incomes

def excelPie():
    names, incomes = readIncomeData()
    wb = Workbook()
    ws = wb.active
    ws.title = "Income"
    ws.append(["Name", "Income"])
    for name, income in zip(names, incomes):
        ws.append([name, income])

    # Create the Excel pie chart object.
    pie = PieChart()
    # Select the income values for the pie chart.
    data = Reference(ws, min_col=2, min_row=1, max_row=len(incomes) + 1)
    # Select the names used as pie-slice labels.
    labels = Reference(ws, min_col=1, min_row=2, max_row=len(names) + 1)
    # Add the income values to the chart.
    pie.add_data(data, titles_from_data=True)
    # Add the names as chart categories.
    pie.set_categories(labels)
    # Give the chart the required StudentID and date title.
    pie.title = f"{STUDENT_ID} {TODAY}"
    # Set the chart height.
    pie.height = 10
    # Set the chart width.
    pie.width = 14
    # Add the completed chart to the worksheet.
    ws.add_chart(pie, "D2")

    wb.save(XLSX_FILE)
    print(f"Created Excel pie chart: {XLSX_FILE.name}")

def verticalBar():
    names, incomes = readIncomeData()
    plt.figure(figsize=(10, 6))
    plt.bar(names, incomes)
    plt.title(f"{STUDENT_ID} {TODAY}")
    plt.xlabel("Name")
    plt.ylabel("Income")
    plt.xticks(rotation=45, ha="right")
    plt.tight_layout()
    plt.show()

def main():
    print(STUDENT_ID)
    print(f"Date: {TODAY}")
    askUser()
    askIncome()
    excelPie()
    verticalBar()

if __name__ == "__main__":
    main()
