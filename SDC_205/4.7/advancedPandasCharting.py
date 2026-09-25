# SDC205 - Mr. Zakaria
# Advanced Pandas and Charting
# Jade Powell
# September 24th, 2026

print("JadPow5144")

import pandas as pd
import matplotlib.pyplot as plt

# Store a classroom roster of 10 students in an array.
students = ["Avery", "Bailey", "Cameron", "Dakota", "Emery",
            "Finley", "Harper", "Jordan", "Morgan", "Riley"]

# Store the two subjects used for each student.
subjects = ["SDC205 Lecture", "SDC205 Lab"]

# Create an index for student and subject using MultiIndex.
index = pd.MultiIndex.from_product(
    [students, subjects],
    names=["Student", "Subject"]
)

# Create grades for each student for the two subjects.
grades = [
    88.0, 91.0,
    92.0, 94.0,
    85.0, 89.0,
    95.0, 97.0,
    90.0, 92.0,
    93.0, 95.0,
    87.0, 90.0,
    91.0, 93.0,
    89.4, 91.0,
    94.0, 93.0
]

# Create a DataFrame of grades for each student and subject.
df = pd.DataFrame({"Grade": grades}, index=index)

# Display the DataFrame.
print("\nClassroom Roster and Grades:")
print(df)

# Group by subject and calculate the mean grade.
average_grades = df.groupby(level="Subject").mean()

# Display the grouped subject averages.
print("\nAverage Grade by Subject:")
print(average_grades)

# Display a vertical bar graph of the grouped averages.
average_grades.plot(kind="bar", legend=False)
plt.xlabel("Subject")
plt.ylabel("Average Grade")
plt.title("Average Grade by Subject")
plt.xticks(rotation=0)
plt.tight_layout()
plt.show()
