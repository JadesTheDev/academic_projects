/*****************************************************
 * Name: Jade Powell
 * Date: March 29, 2026
 * Assignment: SDC220 Week 4 PA – Account Balance Calculations
 *
 * This program asks the user to enter a starting balance
 * and allows them to enter credits or debits. It uses
 * exception handling to prevent invalid input and
 * negative account balances.
 *****************************************************/

using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Jade Powell - Week 4 PA Account Balance Calculations");

        double balance = 0;

        try
        {
            Console.Write("\nPlease enter the starting balance: ");
            balance = Convert.ToDouble(Console.ReadLine());
        }
        catch (FormatException e)
        {
            Console.WriteLine("\nException: {0}", e.Message);
            return;
        }

        while (true)
        {
            try
            {
                Console.Write("\nPlease enter a credit or debit amount (0 to quit): ");
                string input = Console.ReadLine();

                double amount = Convert.ToDouble(input);

                if (amount == 0)
                {
                    break;
                }

                if (balance + amount < 0)
                {
                    throw new Exception("Amount entered will cause account to be negative.");
                }

                balance += amount;

                Console.WriteLine("The updated balance is: {0}", balance);
            }
            catch (FormatException e)
            {
                Console.WriteLine("\nException: {0}", e.Message);
                Console.WriteLine("Please enter a numeric value.");
            }
            catch (Exception e)
            {
                Console.WriteLine("\nException: {0}", e.Message);
            }
        }

        Console.WriteLine("\nFinal balance: {0}", balance);
    }
}
