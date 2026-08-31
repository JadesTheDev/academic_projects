using System;

/*******************************************************************************
Name: Jade Powell
Date: March 16, 2026
Course: SDC220
Assignment: 2.5 Performance Assessment – Loops & Calculations

Description:
This program demonstrates the use of both counter-controlled loops and
condition-based loops. The first part calculates the sum of integers from
1 to 10 and displays the running total. The second part allows the user
to enter integers until they input -1, while tracking the total and count
of values entered.
********************************************************************************/

class Program
{
    static void Main(string[] args)
    {
        // Header output
        Console.WriteLine("Jade Powell - Week 2 PA Loops & Calculations\n");

        // ---------------------------
        // PART 1: Counter-Controlled Loop
        // ---------------------------
        int total = 0;

        Console.WriteLine("Calculating the sum of integers 1 - 10:");

        for (int i = 1; i <= 10; i++)
        {
            total += i;
            Console.WriteLine("Total so far: " + total);
        }

        Console.WriteLine("Final total: " + total + "\n");

        // ---------------------------
        // PART 2: Condition-Based Loop
        // ---------------------------
        int userTotal = 0;
        int count = 0;
        int number;

        Console.WriteLine("Adding integers entered:");

        Console.Write("Enter an integer value (-1 to stop): ");
        number = Convert.ToInt32(Console.ReadLine());

        while (number != -1)
        {
            userTotal += number;
            count++;

            Console.WriteLine("Total so far: " + userTotal);

            Console.Write("Enter an integer value (-1 to stop): ");
            number = Convert.ToInt32(Console.ReadLine());
        }

        Console.WriteLine("Final total: " + userTotal);
        Console.WriteLine("Count of values entered: " + count);
    }
}