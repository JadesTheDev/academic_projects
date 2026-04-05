/**************************************************************************
 * Name: Jade Powell
 * Date: April 5, 2026
 * Assignment: SDC220 5.2 Project - Application Delivery
 * Description: Main program file that starts the calculator application.
 **************************************************************************/

using System;

namespace FinalCalculator
{
    class Program
    {
        static void Main(string[] args)
        {
            CalculatorApp app = new CalculatorApp();
            app.Run();
        }
    }
}
