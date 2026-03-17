using System;

/**************************************************************************
Name: Jade Powell
Date: March 16, 2026
Course: SDC220
Assignment: 2.6 Performance Assessment – Smallest Number

Description:
This program asks the user how many integers they want to enter,
then collects those values and determines the smallest number entered.
***************************************************************************/

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Jade Powell - Week 2 PA Smallest Number\n");

        Console.WriteLine("Finding the Smallest Value:");

        Console.Write("How many integers would you like to enter: ");
        int count = Convert.ToInt32(Console.ReadLine());

        int smallest = 0;

        for (int i = 1; i <= count; i++)
        {
            Console.Write("Enter an integer value: ");
            int number = Convert.ToInt32(Console.ReadLine());

            if (i == 1)
            {
                // first number becomes the smallest
                smallest = number;
            }
            else
            {
                if (number < smallest)
                {
                    smallest = number;
                }
            }
        }

        Console.WriteLine("The smallest value entered is: " + smallest);
    }
}