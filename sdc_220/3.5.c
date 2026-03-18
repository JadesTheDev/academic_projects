using System;
using System.Collections.Generic;

/********************************************************************
* Name: Jade Powell
* Date: March 18, 2026
* Assignment: SDC220 Week 3 PA – Calculations & Unique Numbers
*
* Demonstrates arrays, lists, and unique value calculations.
*********************************************************************/

public class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("\nJade Powell – Week 3 PA Calculations & Unique Numbers\n");

        int[] numbers = new int[10];
        List<int> uniqueNumbers = new List<int>();

        // Get 10 integers
        for (int i = 0; i < numbers.Length; i++)
        {
            Console.Write("Please enter an integer value: ");
            int num = Convert.ToInt32(Console.ReadLine());

            numbers[i] = num;

            // Add only unique values
            if (!uniqueNumbers.Contains(num))
            {
                uniqueNumbers.Add(num);
            }
        }

        // ARRAY calculations
        int sum = 0;
        foreach (int num in numbers)
        {
            sum += num;
        }

        int avg = sum / numbers.Length;

        Console.WriteLine("\nThe count of integers entered is: {0}", numbers.Length);
        Console.WriteLine("The sum of integers entered is: {0}", sum);
        Console.WriteLine("The average of integers entered is: {0}", avg);

        // UNIQUE LIST calculations
        int uniqueSum = 0;
        foreach (int num in uniqueNumbers)
        {
            uniqueSum += num;
        }

        int uniqueAvg = uniqueSum / uniqueNumbers.Count;

        Console.WriteLine("\nThe count of unique integers entered is: {0}", uniqueNumbers.Count);
        Console.WriteLine("The sum of unique integers entered is: {0}", uniqueSum);
        Console.WriteLine("The average of unique integers entered is: {0}", uniqueAvg);
    }
}
