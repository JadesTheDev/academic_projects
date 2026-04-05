/*************************************************
 * Name: Jade Powell
 * Date: April 5, 2026
 * Assignment: SDC220 Performance Assessment - Inheritance & Overriding
 *
 * Main application class.
 * This program demonstrates inheritance and overriding
 * by creating Animal and Cat objects, printing their
 * properties, updating them, and printing them again.
 *************************************************/

using System;

public class Program
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Jade Powell - Week 5 PA - Inheritance & Overriding\n");

        Animal a1 = new Animal("Roo", 2);
        Cat c1 = new Cat("Fluffy", 4, "meow");
        Animal a2 = new Animal("Flipper", 0);
        Cat c2 = new Cat("Garfield", 4, "I'm HUNGRY");

        a1.PrintAnimal();
        c1.PrintAnimal();
        a2.PrintAnimal();
        c2.PrintAnimal();
    }
}
