/*************************************************
 * Name: Jade Powell
 * Date: April 5, 2026
 * Assignment: SDC220 Performance Assessment - Inheritance & Overriding
 *
 * Cat class.
 * This is the derived class that inherits from Animal
 * and adds the cat's sound. This class overrides the
 * PrintAnimal function to print the Cat's information.
 *************************************************/

using System;

public class Cat : Animal
{
    public string Sound { get; set; }

    public Cat(string name, int legs, string sound) : base(name, legs)
    {
        Sound = sound;
    }

    public override void PrintAnimal()
    {
        Console.WriteLine("The Cat's name is {0}, it has {1} legs and is making a {2} sound.", Name, Legs, Sound);
    }
}
