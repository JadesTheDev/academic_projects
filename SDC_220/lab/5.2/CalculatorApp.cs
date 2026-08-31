/**************************************************************************
 * Name: Jade Powell
 * Date: April 5, 2026
 * Assignment: SDC220 5.2 Project - Application Delivery
 * Description: This class contains the final calculator application logic.
 * It supports calculator operations, memory storage, collections,
 * and exception handling in a menu-driven program.
 **************************************************************************/

using System;
using System.Collections.Generic;

namespace FinalCalculator
{
    class CalculatorApp
    {
        private double memoryValue = 0;
        private bool hasMemoryValue = false;
        private List<int> values = new List<int>();

        public void Run()
        {
            bool running = true;

            DisplayHeader();

            while (running)
            {
                DisplayMenu();
                string choice = (Console.ReadLine() ?? "");

                switch (choice)
                {
                    case "1": PerformCalculation("+"); break;
                    case "2": PerformCalculation("-"); break;
                    case "3": PerformCalculation("*"); break;
                    case "4": PerformCalculation("/"); break;
                    case "5": StoreValue(); break;
                    case "6": RetrieveValue(); break;
                    case "7": ClearValue(); break;
                    case "8": ReplaceValue(); break;
                    case "9": AddToCollection(); break;
                    case "10": DisplayCollection(); break;
                    case "11": DisplayCount(); break;
                    case "12": RemoveValueFromCollection(); break;
                    case "13": AddMultipleValues(); break;
                    case "14": DisplaySum(); break;
                    case "15": DisplayAverage(); break;
                    case "16": DisplayDifference(); break;
                    case "0": running = false; break;
                    default: Console.WriteLine("Invalid choice."); break;
                }

                Console.WriteLine();
            }

            Console.WriteLine("Goodbye.");
        }

        private void DisplayHeader()
        {
            Console.WriteLine("=======================================");
            Console.WriteLine("Jade Powell - Final Calculator Project");
            Console.WriteLine("=======================================\n");
        }

        private void DisplayMenu()
        {
            Console.WriteLine("1. Add");
            Console.WriteLine("2. Subtract");
            Console.WriteLine("3. Multiply");
            Console.WriteLine("4. Divide");
            Console.WriteLine("5. Store value");
            Console.WriteLine("6. Retrieve value");
            Console.WriteLine("7. Clear value");
            Console.WriteLine("8. Replace value");
            Console.WriteLine("9. Add to collection");
            Console.WriteLine("10. Show collection");
            Console.WriteLine("11. Count values");
            Console.WriteLine("12. Remove value");
            Console.WriteLine("13. Add multiple values");
            Console.WriteLine("14. Sum values");
            Console.WriteLine("15. Average values");
            Console.WriteLine("16. Difference (first - last)");
            Console.WriteLine("0. Exit");
            Console.Write("Choice: ");
        }

        private double GetNumber(string prompt)
        {
            Console.Write(prompt);
            return Convert.ToDouble(Console.ReadLine());
        }

        private void PerformCalculation(string op)
        {
            try
            {
                double a = GetNumber("Enter first number: ");
                double b = GetNumber("Enter second number: ");

                double result = op switch
                {
                    "+" => a + b,
                    "-" => a - b,
                    "*" => a * b,
                    "/" => b == 0 ? throw new DivideByZeroException() : a / b,
                    _ => throw new Exception("Invalid operation")
                };

                Console.WriteLine($"Result: {result}");
            }
            catch (Exception e)
            {
                Console.WriteLine("Error: " + e.Message);
            }
        }

        private void StoreValue()
        {
            memoryValue = GetNumber("Enter value: ");
            hasMemoryValue = true;
            Console.WriteLine("Stored.");
        }

        private void RetrieveValue()
        {
            Console.WriteLine(hasMemoryValue ? $"Memory: {memoryValue}" : "No value stored.");
        }

        private void ClearValue()
        {
            memoryValue = 0;
            hasMemoryValue = false;
            Console.WriteLine("Cleared.");
        }

        private void ReplaceValue()
        {
            memoryValue = GetNumber("New value: ");
            hasMemoryValue = true;
            Console.WriteLine("Replaced.");
        }

        private void AddToCollection()
        {
            if (values.Count >= 10)
            {
                Console.WriteLine("Collection full.");
                return;
            }

            values.Add((int)GetNumber("Enter integer: "));
        }

        private void DisplayCollection()
        {
            if (values.Count == 0)
            {
                Console.WriteLine("Empty.");
                return;
            }

            foreach (var v in values)
                Console.Write(v + " ");
            Console.WriteLine();
        }

        private void DisplayCount()
        {
            Console.WriteLine("Count: " + values.Count);
        }

        private void RemoveValueFromCollection()
        {
            int val = (int)GetNumber("Value to remove: ");
            values.Remove(val);
        }

        private void AddMultipleValues()
        {
            int count = (int)GetNumber("How many? ");

            for (int i = 0; i < count && values.Count < 10; i++)
            {
                values.Add((int)GetNumber("Enter value: "));
            }
        }

        private void DisplaySum()
        {
            int sum = 0;
            foreach (var v in values) sum += v;

            Console.WriteLine("Sum: " + sum);
        }

        private void DisplayAverage()
        {
            if (values.Count == 0)
            {
                Console.WriteLine("No values.");
                return;
            }

            int sum = 0;
            foreach (var v in values) sum += v;

            Console.WriteLine("Average: " + (double)sum / values.Count);
        }

        private void DisplayDifference()
        {
            if (values.Count < 2)
            {
                Console.WriteLine("Not enough values.");
                return;
            }

            Console.WriteLine("Difference: " + (values[0] - values[^1]));
        }
    }
}
