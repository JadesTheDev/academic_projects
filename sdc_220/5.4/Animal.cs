/*************************************************
 * Name: Jade Powell
 * Date: April 5, 2026
 * Assignment: SDC220 Performance Assessment - Inheritance & Overriding
 *
 * Animal class.
 * This is the base class that provides the generic
 * information shared by all animals. In this case,
 * the generic information is the animal's name and
 * number of legs.
 *************************************************/

using System;

public class Animal
{
    public string Name { get; set; }
    public int Legs { get; set; }

    public Animal(string name, int legs)
    {
        Name = name;
        Legs = legs;
    }

    public virtual void PrintAnimal()
    {
        Console.WriteLine("The Animal's name is {0} and it has {1} legs.", Name, Legs);
    }
}
